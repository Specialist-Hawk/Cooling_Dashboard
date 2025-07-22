import React, {useState} from 'react';
import './Analyticsrightbar.css';
import {useLocation} from 'react-router-dom';

const Analyticsrightbar = () => {

    const location = useLocation();
    let energyOutput = location.state || {};

    console.log(energyOutput);
    return (
        <>
            <div className="main-analyticsrightbar">
                <h1>Results</h1>
                <div className="container">
                    <div className="result-container">
                        <h2>Expected Cell Temperature</h2>
                        <h1 className="result-text">30&deg;<span>C</span></h1>
                    </div>
                    <div className="result-container">
                    <h2>Efficiency for Temperature</h2>
                    <h1 className="result-text">30&deg;<span>C</span></h1>
                    </div>
                    </div>
                    <div className="wrapper">
                    <div className="result-container full-width-container">
                    <h2>Calculated Energy Output (per hour)</h2>
                    <h1 className="result-text">30</h1>
                    </div>
                    </div>
            </div>
        </>
    )
}

export default Analyticsrightbar;