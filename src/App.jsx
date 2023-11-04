import { useState, useEffect } from 'react'
import './App.css'
import { useRoutes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { supabase } from './client'
import CreateCard from './assets/pages/CreateCard'
import EditCard from './assets/pages/EditCard'
import ReadCard from './assets/pages/ReadCard'
import Home from './assets/pages/Home.jsx'
import Info from './assets/pages/Info.jsx'

function App() {
  const [cards, setCards] = useState([]);
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

    fetchCards()

  }, []);

  let element = useRoutes([
    {
      path: "/",
      element:<ReadCard data={cards}/>
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
    }
  ]);
  return (

    <div className="App">

      <div className="header">
        <Link to="/"><button className = "header-button">Home</button></Link>
        <Link to="/create"><button className="header-button"> Create </button></Link>
      </div>
        {element}
    </div>
  )
}

export default App
