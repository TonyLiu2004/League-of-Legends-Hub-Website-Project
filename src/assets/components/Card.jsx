import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../client.jsx';
import './Card.css'

const Card = (props) => {
    const [upvotes, setUpvotes] = useState(0);
    const [upvoted, setUpvoted] = useState(false);
    const [timeStamp, setTimeStamp] = useState(0);
    const [upvoteImg, setUpvoteImg] = useState("src/assets/images/upvote.png");

    // useEffect(() => {
    //     const getData = async () => {
    //         const {data, error} = await supabase
    //         .from('LOL Account Likes')
    //         .select('upvotedPosts')
    //         .eq('id', JSON.parse(sessionStorage.getItem("token")).user.id)
            
    //         if(error) throw error;
    //         //console.log(data);
    //         setTokenUpvoted({data}.data[0].upvotedPosts);
    //     }
    //     getData();
    // }, [])
    
    useEffect(() => {
        if(sessionStorage.getItem("token")){
            if(sessionStorage.getItem("upvoted").includes(props.id)){
                setUpvoted(true);
                setUpvoteImg("src/assets/images/upvoted.png");
            }
        }else{
            const tempToken = JSON.parse(sessionStorage.getItem("temp-token"));
            if(tempToken.upvotedPosts.includes(props.id)){
                setUpvoted(true);
                setUpvoteImg("src/assets/images/upvoted.png");
            }
        }
    }, [sessionStorage.getItem("upvoted")])

    const fetchUpvotes = async () => {
        const { data, error } = await supabase
          .from('LOL Posts')
          .select('upvotes')
          .eq('id', props.id);
    
        if (error) {
          console.log(error);
        } else if (data && data.length > 0) {
          const newUpvotes = data[0].upvotes;
          setUpvotes(newUpvotes);
        }
    };

    useEffect(() => { 
        if(props.upvotes !== undefined) setUpvotes(props.upvotes);
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
        fetchUpvotes();
        setTimeStamp(formatRelativeTime(props.created_at));
    }, [props.upvotes])


    const addLike = async () => {
        const {error} = await supabase   
        .from('LOL Account Likes')
        .update({upvotedPosts : JSON.parse(sessionStorage.getItem('upvoted'))})
        .eq('id', JSON.parse(sessionStorage.getItem("token")).user.id)

        if(error) throw error;
    }

    const removeLike = async () => {
        const {error} = await supabase
        .from('LOL Account Likes')
        .update({upvotedPosts : JSON.parse(sessionStorage.getItem('upvoted'))})
        .eq('id', JSON.parse(sessionStorage.getItem("token")).user.id)

        if(error) throw error;
    }

    const upvotePost = async (event) => {
        event.preventDefault();
        let i = upvotes;
        if(!upvoted) {
            i++;
        }else{
            i--;
        }

        const { error } = await supabase
        .from('LOL Posts')
        .update({upvotes: i})
        .eq('id', props.id)

        if (error) {
            console.log(error);
        }else{
            setUpvotes(i);
            setUpvoted(!upvoted);
        }

        if(!upvoted){
            setUpvoteImg("src/assets/images/upvoted.png"); //upvoted
            const newUpvoted = JSON.parse(sessionStorage.getItem('upvoted'));
            newUpvoted.push(props.id);
            sessionStorage.setItem('upvoted', JSON.stringify(newUpvoted));

            if(sessionStorage.getItem("token")){
                addLike();
            }else{
                const tempToken = JSON.parse(sessionStorage.getItem("temp-token"));
                if(!tempToken.upvotedPosts.includes(props.id)){
                    tempToken.upvotedPosts = [...tempToken.upvotedPosts, props.id];
                    sessionStorage.setItem("temp-token",JSON.stringify(tempToken));   
                }
            }
        }else{
            setUpvoteImg("src/assets/images/upvote.png"); //not upvoted
            let newUpvoted = JSON.parse(sessionStorage.getItem('upvoted'));
            newUpvoted = newUpvoted.filter((item) => {
                return item != props.id
            })
            sessionStorage.setItem('upvoted', JSON.stringify(newUpvoted));
            console.log(newUpvoted);

            if(sessionStorage.getItem("token")){
                removeLike();
            }else{  
                const tempToken = JSON.parse(sessionStorage.getItem("temp-token"));
                if(tempToken.upvotedPosts.includes(props.id)){
                    const removed = tempToken.upvotedPosts.filter((item) => {
                        return item != props.id
                    })
                    tempToken.upvotedPosts = removed;
                    sessionStorage.setItem("temp-token", JSON.stringify(tempToken));
                }
            }
        } // end else
    }

        return (
        <div className="Card">
            <Link
                to={`/info/${props.id}`}
                key={props.id}
                >
            <div className = "container">
                <div>
                    <div className = "post-top">
                        <h3 className="post-title">{props.title}</h3>
                        <p className ="timestamp">By {props.creatorName} {timeStamp}</p>
                    </div>
                    <div className="description-container">
                        <h3 className="post-description">{props.description}</h3>
                    </div>
                </div>
                <div>
                    {props.image !== "" && (
                        <img className = "post-image" src={props.image} alt="Your Image" />
                    )}
                </div>
            </div>
            </Link>
            <div className = "post-bottom">
                <img className = "upvote-img" src = {upvoteImg} style={{ cursor: 'pointer' }} onClick={(event) => {
                    upvotePost(event);
                    setUpvoted(!upvoted);
                }}></img>
                <h3 className="upvotes">{upvotes} upvotes</h3>
                {
                    props.user_id == props.creatorID ? 
                    <Link className = "link" to={`/edit/${props.id}`}>Edit Post</Link>  
                    : ""
                }
            </div>
        </div>
    );
};

export default Card;