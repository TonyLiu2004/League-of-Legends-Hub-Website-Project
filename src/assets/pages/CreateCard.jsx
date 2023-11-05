import React, { useState } from 'react';
import { supabase } from '../../client.jsx';
import "./CreateCard.css";
const CreateCard = () => {
    const [card, setCard] = useState({title: "", description: "", image: "", upvotes: 0})

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
        .insert({title: card.title, description: card.description, image: card.image, upvotes: card.upvotes})
        .select()

        if (error) {
            console.log(error);
        }

        window.location = "/create";

    }
    return(
        <div>
            <h1>Create a New Post</h1>
            <form>
                <label >Title</label> <br />
                <input type="text" id="name" name="title" value ={card.title} onChange={handleChange}/><br />
                <br/>

                <label>Description</label><br />
                <textarea type="text" id="description" name="description" value={card.description} onChange={handleChange} rows="4" cols = "20"/><br />
                <br/>

                <label>Image (optional)</label><br/>
                <input type = "text" id="image" name = "image" value = {card.image} onChange = {handleChange}/><br/>
                <br/>

                <input style = {{fontSize: "15px" }} type="submit" value="Create Post" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreateCard