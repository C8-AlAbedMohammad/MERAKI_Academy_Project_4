import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import RightBar from '../../components/RightBar/RightBar'
import LeftBar from '../../components/LeftBar/LeftBar'
import Feeds from '../../components/Feeds/Feeds'
import Share from "../../components/share/Share"
import "./home.scss"
const Home = () => {
  return (
    <div>
      <NavBar/>
      <div className="homePage">
           <LeftBar className="left"/>   
          <div className='feedsBox'>
            <Share/>
            <Feeds className="center"/>
            </div> 
           <RightBar className="right"/>
      </div>

      </div>
  
  )
}

export default Home