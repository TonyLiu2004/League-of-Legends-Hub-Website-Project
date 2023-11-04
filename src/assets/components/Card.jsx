import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

const Card = (props) => {
    const [upvotes, setUpvotes] = useState(0);
    useEffect(() => { 
        if(props.upvotes !== undefined) setUpvotes(props.upvotes);
    }, [])
    return (
        <div className="Card">
            <Link
                to={`/info/${props.id}`}
                key={props.id}
                >
            <div className = "container">
                <div>
                    <h3 className="post-title">Title: {props.title}</h3>
                    <div className="description-container">
                        <h3 className="post-description">Description: {props.description}</h3>
                    </div>
                    <div className = "post-bottom">
                        <h3 className="upvotes">{upvotes} upvotes</h3>
                        <Link className = "link" to={`/edit/${props.id}`}>Edit Post</Link>  
                    </div>
                </div>
                <div>
                    {props.image !== "" && (
                        <img src={props.image} alt="Your Image" />
                    )}
                </div>
            </div>
            </Link>
        </div>
    );
};

export default Card;