import React, {useState, useEffect} from 'react';
import { useParams} from 'react-router-dom';
import { Link } from 'react-router-dom'
import { supabase } from '../../client.jsx';
import "./info.css";

const Info = ({ data }) => {
    const {id} = useParams();
    const info = data.find(item => item.id.toString() === id);
    const [upvotes, setUpvotes] = useState(0);

    const fetchUpvotes = async () => {
        const { data, error } = await supabase
          .from('LOL Posts')
          .select('upvotes')
          .eq('id', info.id);
    
        if (error) {
          console.log(error);
        } else if (data && data.length > 0) {
          const newUpvotes = data[0].upvotes;
          setUpvotes(newUpvotes);
        }
    };
    useEffect(() => {
        if(data.upvotes !== undefined) setUpvotes(data.upvotes);
        fetchUpvotes();
    },[data.upvotes]);

    return (
        <div>
            <h3 className="info-title">Title: {info.title}</h3>
            <div className = "info-container">
                <div>
                    <div className="description-container">
                        <h3 className="info-description">DESCRIPTION: {info.description}</h3>
                    </div>
                    {info.image !== "" && (
                        <img className = "info-image" src={info.image} alt="Your Image" />
                    )}
                    <div className = "post-bottom">
                        <h3 className="upvotes">{upvotes} upvotes</h3>
                        <Link className = "link" to={`/edit/${info.id}`}>Edit Post</Link>
                    </div>
                </div>
            </div>

            <div className = "comment-section">

            </div>
        </div>
    );
}
export default Info;