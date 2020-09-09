import React from 'react';
import GetRequest from './GetRequest.js';
import GetOrderBook from './GetOrderBook.js';
import GetOrderChart from './GetOrderChart.js';
import GetBookChart from './GetBookChart.js';
import './App.css';


function App() {

  return (
    <div className="App">

      <div className="left-col">

        <div className = "top">
          <h1 style={{color:"lightblue"}}>HDAI Constituents</h1>
          <GetRequest />
        </div>

        <div className = "bottom">
          <h1 style={{color:"lightblue"}}>________________________ Price Chart ________________________</h1>
          <GetOrderChart />
        </div>

      </div>

      <div className="right-col">

        <div className = "top">
          <h1 style={{color:"lightblue"}}>Order Book</h1>
          <GetOrderBook />
        </div>

        <div className = "bottom">
          <h1 style={{color:"lightblue"}}>_____________________ Order Book Chart _____________________</h1>
          <GetBookChart />
        </div>

      </div>
    </div>
  );
}

export default App;
