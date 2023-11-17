import React, { useState, useEffect} from 'react';
import { supabase } from '../../client.jsx';
import {useNavigate  } from 'react-router-dom'
import "./CreateCard.css";


const CreateCard = ({token}) => {
    const [card, setCard] = useState({title: "", description: "", image: "", upvotes: 0})
    const [userName, setUserName] = useState("anonymous");
    const [userID, setUserID] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(token){
            setUserName(token.user.user_metadata.full_name);
            setUserID(token.user.id);
        }else{
            setUserName("anonymous" + JSON.stringify(JSON.parse(sessionStorage.getItem("temp-token")).user).slice(1, 8)); // anonymous + first 8 letter of token
            setUserID(JSON.parse(sessionStorage.getItem("temp-token")).user);
        }
    },[token])

    const handleChange = (event) => {
        const {name, value} = event.target;
        setCard( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createPost = async (event) => {
        event.preventDefault();
        const { error } = await supabase
            .from('LOL Posts')
            .insert({title: card.title, 
                     description: card.description, 
                     image: card.image, 
                     upvotes: card.upvotes, 
                     username: userName, 
                     creatorID: userID})
            .select()

            if (error) {
                console.log(error);
            }
            
            navigate('/create');
            location.reload();
    }
    return(
        <div>
            <h1>Create a New Post</h1>
            <form className = "create-form">
                <p style = {{marginBottom:"10px", marginTop:"5px", textAlign:"left", fontSize:"20px"}}>Creating as {userName}</p>

                <input placeholder="Title" type="text" id="title" name="title" value ={card.title} onChange={handleChange}/><br />
                <br/>

                <textarea placeholder="Description (optional)" type="text" id="description" name="description" value={card.description} onChange={handleChange} rows="4" cols = "20"/><br />
                <br/>

                <input placeholder="Image Link (optional)" type = "text" id="image" name = "image" value = {card.image} onChange = {handleChange}/><br/>
                <br/>

                <button style = {{fontSize: "18px", backgroundColor:"black", padding:"6px", borderRadius:"10px", color:"lightgrey"}} type="submit" onClick={createPost}>Create Post</button>
            </form>
        </div>
    )
}

export default CreateCard