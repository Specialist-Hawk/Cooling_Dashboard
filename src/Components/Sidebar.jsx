import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './Sidebar.css';
import Home from './Icons/home.png';
import History from './Icons/history.png';
import Analytics from './Icons/analytics.png';
import Settings from './Icons/settings.png';
import ThemeToggle from './Icons/dark-mode.png';


const Sidebar = () => {

  return (
    <div className='main-sidebar-container'>
      <div>
        <ul className='ul-container'>
            <Link to='/home'>
            <h4 className="menu">Hello (Username)!</h4>
            <li className='li-container'>
                <img className='sidebar-icons' src={Home} alt="" />
                <p className='item-names'>Home</p>
            </li>
            </Link>
            <Link to='/analytics'>
            <li className='li-container'>
                <img className='sidebar-icons' src={Analytics} alt="" />
                <p className='item-names'>Analytics</p>
            </li>
            </Link>
            <li className='li-container'>
                <img className='sidebar-icons' src={History} alt="" />
                <p className='item-names'>History</p>
            </li>
            <li className='li-container'>
                <img className='sidebar-icons' src={Settings} alt="" />
                <p className='item-names'>Settings</p>
            </li>
        </ul>

        <div className="display-mode-container">
          <img className='display-mode-icons' src={ThemeToggle} alt="" />
        </div>

      </div>
    </div>
  )
}





export default Sidebar