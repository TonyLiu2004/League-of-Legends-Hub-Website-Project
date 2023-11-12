import { useState, useEffect } from 'react'
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

  if(token){
    sessionStorage.setItem('token',JSON.stringify(token))
  }

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

  console.log(token);
  let element = useRoutes([
    {
      path: "/",
      element:<HomePage data={cards} token={token}/>
    },
    {
      path:"/edit/:id",
      element: <EditCard data={cards} />
    },
    {
      path:"/create",
      element: <CreateCard />
    },
    {
      path:"info/:id",
      element: <Info data = {cards}/>
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
        <Link to="/signup"><button> {token ? token.user.user_metadata.full_name: "Sign Up"}</button></Link>
        <button onClick={handleLogOut}>Logout</button>
      </div>
        {element}
    </div>
  )
}

export default App
