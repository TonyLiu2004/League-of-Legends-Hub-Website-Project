import React, {useState, useEffect} from 'react';
import { supabase } from '../../client.jsx';
import { useParams } from 'react-router-dom';
import "./EditCard.css"

const EditCard = ({data}) => {
    const {id} = useParams();
    const [card, setCard] = useState({id: null, title: "", description: "", image: "", upvotes: 0});

    useEffect(() => {
        const result = data.filter(item => String(item.id) === id)[0];
        setCard({title: result.title, description: result.description, image: result.image, upvotes: result.upvotes});
    }, [data, id]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setCard( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updateCard = async (event) => {
        event.preventDefault();
        const { error } = await supabase
        .from('LOL Posts')
        .update({title: card.title, description: card.description, image: card.image, upvotes: card.upvotes})
        .eq('id', id)

        if (error) {
            console.log(error);
        }

        window.location = "/";
    }

    const deletePost = async (event) => {
        event.preventDefault();
    
        await supabase
        .from('LOL Posts')
        .delete()
        .eq('id', id); 
    
        window.location = "/";
    }

    return(
        <div>
            <form className = "edit-form">
                <input placeholder="Title" type="text" id="title" name="title" value={card.title} onChange={handleChange}/><br />
                <br/>

                <textarea className="resizable-input" placeholder="Description (optional)" type="text" id="description" name="description" value={card.description} onChange={handleChange} rows="4" cols = "20"/><br />
                <br/>

                <input type = "text" placeholder="Image Link (optional)" id="image" name = "image" value = {card.image} onChange = {handleChange}/><br/>
                <br/>

                <div className="button-container">
                    <button className="deleteButton" onClick={deletePost}>Delete Post</button>
                    <button className="edit-submit-button" type="submit" onClick={updateCard}>Update Post</button>
                </div>
            </form>
        </div>
    )
}

export default EditCard;