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
            <h3>{desc}</h3>
            <Link className = "link" to={`/edit/${info.id}`}>Edit Post</Link>
        </div>
    );
}
export default Info;