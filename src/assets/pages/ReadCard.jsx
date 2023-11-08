import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import './ReadCard.css';
import banner from '../images/lol-banner.jpg';

const ReadCard = (props) =>{
    const [posts, setPosts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searched, setSearched] = useState(false);
    const [filtered, setFiltered] = useState(null);
    const [sortOrder, setSortOrder] = useState("time");
    useEffect(() => {
        setPosts(props.data);
        setFiltered(props.data);
    }, [props]);


    const handleSearch = async (e) =>{
        setSearched(true);
        if(e != ""){
            const f = Object.fromEntries(
                Object.entries(props.data).filter(([, item]) =>
                 item.title.toLowerCase().includes(searchText.toLowerCase())
              )
            );
            setFiltered(f);
        }
    }

    const handleSortOrderChange = (e) =>{
        setSortOrder(e.target.value);
        console.log(sortOrder);
    }
    
    //SORT BY TIME NOT WORKING!!!!!!!
    return (
        <div>
            <div className = "title-bar">
                <h1 className = "LOLtitle">League of Legends <br/>Discussion Hub</h1>
                <img style = {{width: '100%', height: '100%'}} src = {banner} alt="League of Legends Banner image"></img>
            </div>

            <div className = "searchBar">
                <select style = {{marginRight:"5px  "}} id="sortOrderSelect" name="sortOrder" value={sortOrder} onChange = {(handleSortOrderChange)}>
                    <option value = "time">Time</option>
                    <option value = "upvotes-asc">Upvotes Ascending</option>
                    <option value = "upvotes-desc">Upvotes Descending</option>
                </select>

                <input id = "searchInput" type="text" onChange={(inputString) => setSearchText(inputString.target.value)}/><br />
                <button id = "searchButton" onClick = {handleSearch}>Search</button>
            </div>

            <div className="readCards">
                {searched ?
                    sortOrder == "time" ?
                        Object.values(filtered)
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .map((post) => (
                            <Card id={post.id} title={post.title} description={post.description} image={post.image} upvotes={post.upvotes} created_at = {post.created_at}/>
                        ))
                    :sortOrder == "upvotes-desc" ?
                        Object.values(filtered)
                        .sort((a, b) => b.upvotes - a.upvotes)
                        .map((post) => (
                            <Card id={post.id} title={post.title} description={post.description} image={post.image} upvotes={post.upvotes} created_at = {post.created_at}/>
                        ))
                    :   Object.values(filtered)
                        .sort((a, b) => a.upvotes - b.upvotes)
                        .map((post) => (
                            <Card id={post.id} title={post.title} description={post.description} image={post.image} upvotes={post.upvotes} created_at = {post.created_at}/>
                        ))
                 
                : sortOrder == "upvotes-desc" ?   
                    posts
                        .sort((a, b) => b.upvotes - a.upvotes)
                        .map((post) => (
                        <Card id={post.id} title={post.title} description={post.description} image={post.image} upvotes={post.upvotes} created_at = {post.created_at}/>
                    ))   
                : sortOrder == "upvotes-asc" ?   
                    posts
                        .sort((a, b) => a.upvotes - b.upvotes)
                        .map((post) => (
                        <Card id={post.id} title={post.title} description={post.description} image={post.image} upvotes={post.upvotes} created_at = {post.created_at}/>
                    ))            
                :  posts && posts.length > 0 ?
                        posts
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .map((post) => (
                            <Card id={post.id} title={post.title} description={post.description} image={post.image} upvotes={post.upvotes} created_at = {post.created_at}/>
                        ))
                    : <h2>{'No posts yet 😞'}</h2>
                }
            </div>  
        </div>
    )
}

export default ReadCard;