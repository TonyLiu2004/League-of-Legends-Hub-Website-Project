import React, {useState, useEffect} from 'react';
import { useParams} from 'react-router-dom';
import { Link } from 'react-router-dom'
import { supabase } from '../../client.jsx';
import "./info.css";

const Info = ({ data }) => {
    const {id} = useParams();
    const info = data.find(item => item.id.toString() === id);
    const [upvotes, setUpvotes] = useState(0);
    const [userComment, setUserComment] = useState('');
    const [displayComments, setDisplayComments] = useState(info.comments);
    
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

    const handleCommentChange = (e) => {
        setUserComment(e.target.value);
    }

    const handlePostComment = async () => {
        let commentObject = {
            name: 'anonymous', 
            comment: userComment,
            timestamp: new Date().toISOString(), // Current timestamp
        };
        
        let updatedComments = [...displayComments];
        updatedComments.push(commentObject);
        console.log(updatedComments);

        const {error } = await supabase
            .from('LOL Posts')
            .update({ comments: updatedComments})
            .eq('id', id);

        if(!error){
            setDisplayComments(updatedComments);
        }
    };

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
                        <h3 className="info-upvotes">{upvotes} upvotes</h3>
                        <Link className = "link" to={`/edit/${info.id}`}>Edit Post</Link>
                    </div>
                </div> <hr className = "info-horizontal-line"/> <br/>

                <div style={{ display: "flex", flexDirection: "column"}} className = "user-comment">
                    <label style={{ textAlign: "left", marginBottom:"10px" }}>Add Comment</label>   
                    <textarea className="resizable-input" style={{resize: "vertical"}} type="text" id="comment" name="comment" rows="4" cols = "20" onChange={handleCommentChange} value = {userComment}/><br />
                    <button style={{ alignSelf: "flex-end", marginBottom:"10px", backgroundColor: "white", color:"black"}} onClick = {handlePostComment}>Post</button>
                </div>

                <div className = "comment-section">

                </div>
            </div>
        </div>
    );
}
export default Info;