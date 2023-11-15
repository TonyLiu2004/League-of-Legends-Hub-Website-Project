import { useState, useEffect} from 'react'
import { v4 as uuid } from "uuid";
import './App.css'
import { useRoutes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { supabase } from './client'
import CreateCard from './assets/pages/CreateCard'
import EditCard from './assets/pages/EditCard'
import HomePage from './assets/pages/HomePage.jsx'
import Info from './assets/pages/Info.jsx'
import SignUp from './assets/pages/SignUp.jsx'
import Login from './assets/pages/Login.jsx'

function App() {
  const [cards, setCards] = useState([]);
  const [token, setToken] = useState(false);


  useEffect(() => {
    if(token){
      sessionStorage.setItem('token',JSON.stringify(token))
    }else{
      if(!sessionStorage.getItem("temp-token")){
        const unique_id = {
          user: uuid(),
          upvotedPosts: []
        };
        sessionStorage.setItem('temp-token',JSON.stringify(unique_id))
      }
    }
  }, [])

  useEffect(() => {
    // read all post from table
    const fetchCards = async () => {
      const {data} = await supabase
      .from('LOL Posts')
      .select()
      .order('created_at', { ascending: true })

      // set state of posts
      setCards(data)

    }

    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'));
      setToken(data);
    }

    fetchCards()
  }, []);

  const handleLogOut = () =>{
    sessionStorage.removeItem('token');
    alert("Successfully Logged out");
    setToken(false);  
  }

  let element = useRoutes([
    {
      path: "/",
      element:<HomePage data={cards} token={token} tempToken = {JSON.parse(sessionStorage.getItem("temp-token"))}/>
    },
    {
      path:"/edit/:id",
      element: <EditCard data={cards} />
    },
    {
      path:"/create",
      element: <CreateCard token={token}/>
    },
    {
      path:"info/:id",
      element: <Info data = {cards} token = {token}/>
    },
    {
      path:"/signup",
      element: <SignUp/>
    },
    {
      path:"/login",
      element:<Login setToken={setToken}/>
    }
  ]);
  return (

    <div className="App">

      <div className="header">
        <Link to="/"><button className = "header-button">Home</button></Link>
        <Link to="/create"><button className="header-button"> Create </button></Link>
        {
          token ? 
          <button style= {{alignSelf:"flex-end", marginLeft:"auto"}} className = "login-button">{token.user.user_metadata.full_name}</button>
          :
          <Link style= {{alignSelf:"flex-end", marginLeft:"auto"}} to="/login"><button className = "login-button">Login</button></Link>

        }
        <button className = "logout-button" onClick={handleLogOut}>Logout</button>
      </div>
        {element}
    </div>
  )
}

export default App
