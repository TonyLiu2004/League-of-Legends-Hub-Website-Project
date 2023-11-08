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

    console.log(info);
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

    function formatRelativeTime(timestamp) {
        const now = new Date();
        const time = new Date(timestamp);
    
        const timeDifference = now - time;
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
    
        if (hours >= 24) {
            return `${Math.floor(hours / 24)} days ago`;
        } else if (hours >= 1) {
            return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        } else if (minutes >= 1) {
            return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        } else {
            return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
        }
    }

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
                    {
                        info.comments == null ?
                            <p>No Comments</p>
                        : displayComments.slice().reverse().map((c, index) => (
                            <div key={index} className = "each-comment">
                                <div className = "each-comment-top">
                                    <p>{c.name}</p>
                                    <p className = "comment-timestamp">{formatRelativeTime(c.timestamp)}</p>
                                </div>
                                <p className = "comment-text">{c.comment}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
export default Info;