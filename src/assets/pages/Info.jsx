import React, {useState, useEffect} from 'react';
import { useParams} from 'react-router-dom';
import { Link } from 'react-router-dom'

const Info = ({ data }) => {
    const {id} = useParams();
    const info = data.find(item => item.id.toString() === id);
    const [desc, setDesc] = useState("?");
    useEffect(() => {
        const setDescription  = () => {

        }
        setDescription ();
    },[]);

    return (
        <div>
            <div className = "container">
                <div>
                    <h3 className="post-title">Title: {info.title}</h3>
                    <div className="description-container">
                        <h3 className="post-description">DESCRIPTION: {info.description}</h3>
                    </div>
                    <div className = "post-bottom">
                        <h3 className="upvotes">{info.upvotes} upvotes</h3>
                        <Link className = "link" to={`/edit/${info.id}`}>Edit Post</Link>
                    </div>
                </div>
                <div>
                    {info.image !== "" && (
                        <img src={info.image} alt="Your Image" />
                    )}
                </div>
            </div>
        </div>
    );
}
export default Info;