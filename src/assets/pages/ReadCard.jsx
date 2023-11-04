import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import './ReadCard.css';
import banner from '../images/lol-banner.jpg';

const ReadCard = (props) =>{
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        setPosts(props.data);
    }, [props]);

    return (
        <div>
            <div className = "title-bar">
                <h1 className = "LOLtitle">League of Legends <br/>Discussion Hub</h1>
                <img style = {{width: '100%', height: '100%'}} src = {banner} alt="League of Legends Banner image"></img>
            </div>
            
            <div className="readCards">
                {
                    posts && posts.length > 0 ?
                        posts.slice().reverse().map((post) => (
                            <Card id={post.id} title={post.title} description={post.description} image={post.image} upvotes={post.upvotes} created_at = {post.created_at}/>
                        ))
                    : <h2>{'No posts yet 😞'}</h2>
                }
            </div>  
        </div>
    )
}

export default ReadCard;