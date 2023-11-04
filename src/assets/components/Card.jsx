import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

const Card = (props) => {
    return (
        <div className="Card">
            <Link
                to={`/info/${props.id}`}
                key={props.id}
                >
            <div className = "container">
                <h3 className="title">Title: {props.title}</h3>
                <h3 className="description">Description: {props.description}</h3>
                <div className = "post-bottom">
                    <h3 className="upvotes">upvotes: {props.upvotes}</h3>
                    <Link className = "link" to={`/edit/${props.id}`}>Edit Post</Link>  
                </div>
            </div>
            </Link>
        </div>
    );
};

export default Card;