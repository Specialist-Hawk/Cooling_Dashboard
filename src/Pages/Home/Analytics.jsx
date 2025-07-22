import React from 'react';
import Sidebar from '../../Components/Sidebar.jsx';
import Analyticsrightbar from '../../Components/Analyticsrightbar.jsx';
import './Analytics.css';

function Analytics() {
  return (
    <>
    <div className='main-analytics-container'>
      <Sidebar />
      <Analyticsrightbar />
    </div>
   </> 
  )
}

export default Analytics