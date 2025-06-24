import React from 'react';
import Sidebar from '../../Components/Sidebar.jsx';
import Homerightbar from '../../Components/Homerightbar.jsx';
import './Home.css'

function Home() {
  return (
    <>
    <div className='main-home-container'>
      <Sidebar />
      <Homerightbar/>
    </div>
   </> 
  )
}

export default Home
