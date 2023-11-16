import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import './HomePage.css';
import banner from '../images/lol-banner.jpg';
import { supabase } from '../../client';

const HomePage = ({data, token}) =>{
    const [posts, setPosts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searched, setSearched] = useState(false);
    const [filtered, setFiltered] = useState(null);
    const [sortOrder, setSortOrder] = useState("time");
    const [userID, setUserID] = useState("");

    //console.log(data);

    const getUpvotedArray = async () =>{
        const {data, error} = await supabase
        .from('LOL Account Likes')
        .select('upvotedPosts')
        .eq('id', JSON.parse(sessionStorage.getItem("token")).user.id)

        if(error) throw error;
        sessionStorage.setItem('upvoted', JSON.stringify(data[0].upvotedPosts));
    }
    useEffect(() => {
        if(token) {
            setUserID(token.user.id);
            getUpvotedArray();
        }
        else setUserID("");
    }, [token])

    useEffect(() => {
        setPosts(data);
        setFiltered(data);
    }, [data]);


    const handleSearch = async (e) =>{
        setSearched(true);
        if(e != ""){
            const f = Object.fromEntries(
                Object.entries(data).filter(([, item]) =>
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
    
    return (
        <div>
            <div className = "title-bar">
                <h1 className = "LOLtitle">League of Legends <br/>Discussion Hub</h1>
                <img style = {{width: '100%', height: '100%'}} src = {banner} alt="League of Legends Banner image"></img>
            </div>

            <div className = "searches">
                <div>
                    <label style = {{marginRight:"7px", fontSize:"16px"}}>Sort By</label>
                    <select style = {{marginRight:"5px  "}} id="sortOrderSelect" name="sortOrder" value={sortOrder} onChange = {(handleSortOrderChange)}>
                        <option value = "time">Time</option>
                        <option value = "upvotes-asc">Upvotes Ascending</option>
                        <option value = "upvotes-desc">Upvotes Descending</option>
                    </select>
                </div>
                <p style = {{margin:"0px"}}> {
                    searched ? 
                    Object.keys(filtered).length
                    : posts.length
                
                } results</p>
                <div className = "searchBar">
                    <input id = "searchInput" type="text" onChange={(inputString) => setSearchText(inputString.target.value)}/><br />
                    <button id = "searchButton" onClick = {handleSearch}>Search</button>
                </div>
            </div>
                
            <div className="readCards">
                {searched ?
                    sortOrder == "time" ?
                        Object.values(filtered)
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .map((post) => (
                            <Card id={post.id} title={post.title} description={post.description} image={post.image} upvotes={post.upvotes} created_at = {post.created_at} user_id = {userID} creatorName={post.username} creatorID={post.creatorID} />
                        ))
                    :sortOrder == "upvotes-desc" ?
                        Object.values(filtered)
                        .sort((a, b) => b.upvotes - a.upvotes)
                        .map((post) => (
                            <Card id={post.id} title={post.title} description={post.description} image={post.image} upvotes={post.upvotes} created_at = {post.created_at} user_id = {userID} creatorName={post.username} creatorID={post.creatorID} />
                        ))
                    :   Object.values(filtered)
                        .sort((a, b) => a.upvotes - b.upvotes)
                        .map((post) => (
                            <Card id={post.id} title={post.title} description={post.description} image={post.image} upvotes={post.upvotes} created_at = {post.created_at} user_id = {userID} creatorName={post.username} creatorID={post.creatorID} />
                        ))
                 
                : sortOrder == "upvotes-desc" ?   
                    posts
                        .sort((a, b) => b.upvotes - a.upvotes)
                        .map((post) => (
                        <Card id={post.id} title={post.title} description={post.description} image={post.image} upvotes={post.upvotes} created_at = {post.created_at} user_id = {userID} creatorName={post.username} creatorID={post.creatorID} />
                    ))   
                : sortOrder == "upvotes-asc" ?   
                    posts
                        .sort((a, b) => a.upvotes - b.upvotes)
                        .map((post) => (
                        <Card id={post.id} title={post.title} description={post.description} image={post.image} upvotes={post.upvotes} created_at = {post.created_at} user_id = {userID} creatorName={post.username} creatorID={post.creatorID} />
                    ))            
                :  posts && posts.length > 0 ?
                        posts
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .map((post) => (
                            <Card id={post.id} title={post.title} description={post.description} image={post.image} upvotes={post.upvotes} created_at = {post.created_at} user_id = {userID} creatorName={post.username} creatorID={post.creatorID} />
                        ))
                    : <h2>{'No posts yet 😞'}</h2>
                }
            </div>  
        </div>
    )
}

export default HomePage;