import React, { useState } from 'react';
import './Homerightbar.css';
import GHI from './Icons/GHI.png';
import Temperature from './Icons/thermometer.png';
import Navbar from './Navbar';

const Homerightbar = () => {

  const [ghi, setGhi] = useState('');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [dhi, setDhi] = useState('');
  const [dni, setDni] = useState('');
  const [capacity, setCapacity] = useState('');
  const [efficiency, setEfficiency] = useState('');

  const handleAnalyze = (e) => {
    e.preventDefault();

    const data = {
      ghi,
      temperature,
      humidity,
      windSpeed,
      dhi,
      dni,
      capacity,
      efficiency,
    };

    console.log('Analyzing with data:', data);
    window.alert('Thank you for the submittion: Analyzing data.');
    // TODO: make API call or further processing here
  };

  return (
    <div className='main-homerightbar'>
      <h1>Solar Parameters</h1>
      <form onSubmit={handleAnalyze}>
        <div className="box-container">
          <div className="corner-left input-container c1">
            <p className='input-name'>Global Horizontal Irradiance (GHI)</p>
            <input
              placeholder='0'
              className='input-field p1'
              type="number"
              value={ghi}
              onChange={e => setGhi(e.target.value)}
              required
            />
            <p className='input-unit'>Wh/m<sup>2</sup></p>
          </div>
          <div className="input-container c2">
            <p className='input-name'>Temperature (T)</p>
            <input
              placeholder='0'
              className='input-field p2'
              type="number"
              value={temperature}
              onChange={e => setTemperature(e.target.value)}
              required
            />
            <p className='input-unit'>&deg;C</p>
          </div>
          <div className="corner-right input-container c3">
            <p className='input-name'>Humidity (RH)</p>
            <input
              placeholder='0'
              className='input-field p3'
              type="number"
              value={humidity}
              onChange={e => setHumidity(e.target.value)}
              required
            />
            <p className='input-unit'>%</p>
          </div>
        </div>

        <div className="box-container">
          <div className="corner-left input-container c4">
            <p className='input-name'>Wind Speed (W.S.)</p>
            <input
              placeholder='0'
              className='input-field p4'
              type="number"
              value={windSpeed}
              onChange={e => setWindSpeed(e.target.value)}
              required
            />
            <p className='input-unit'>m/s</p>
          </div>
          <div className="input-container c5">
            <p className='input-name'>Diffuse Horizontal Irradiance (DHI)</p>
            <input
              placeholder='0'
              className='input-field p5'
              type="number"
              value={dhi}
              onChange={e => setDhi(e.target.value)}
              required
            />
            <p className='input-unit'>Wh/m<sup>2</sup></p>
          </div>
          <div className="corner-right input-container c6">
            <p className='input-name'>Direct Normal Irradiation (DNI)</p>
            <input
              placeholder='0'
              className='input-field p6'
              type="number"
              value={dni}
              onChange={e => setDni(e.target.value)}
              required
            />
            <p className='input-unit'>Wh/m<sup>2</sup></p>
          </div>
        </div>

        <h1>System Configurations</h1>

        <div className="box-container">
          <div className="corner-left input-container system c7">
            <p className='input-name'>PV System Capacity</p>
            <input
              placeholder='0'
              className='input-field p7'
              type="number"
              value={capacity}
              onChange={e => setCapacity(e.target.value)}
              required
            />
            <p className='input-unit'>kW</p>
          </div>
          <div className="corner-right input-container system c8">
            <p className='input-name'>System Efficiency (0-1)</p>
            <input
              placeholder='0'
              className='input-field p8'
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={efficiency}
              onChange={e => setEfficiency(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="submit-container">
          <button type="submit" className='analyze-button'>Analyze</button>
        </div>
      </form>
    </div>
  );
}

export default Homerightbar;
