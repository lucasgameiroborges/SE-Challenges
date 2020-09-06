import React from 'react';
import GetRequest from './GetRequest.js';
import './App.css';

const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: '<key>',
  APISECRET: '<secret>'
});


binance.prices('BNBBTC', (error, ticker) => {
  console.info("Price of BNB: ", ticker.BNBBTC);
});

function App() {

  return (
    <div className="App">

      <div className="left-col">

        <div className = "top">
          <h1 style={{color:"lightblue"}}>HDAI Constituents</h1>
          <GetRequest />
        </div>

        <div className = "bottom">
          <h1 style={{color:"lightblue"}}>Price Chart</h1>
        </div>

      </div>

      <div className="right-col">

        <div className = "top">
          <h1 style={{color:"lightblue"}}>Order Book</h1>
        </div>

        <div className = "bottom">
          <h1 style={{color:"lightblue"}}>Order Book Chart</h1>
        </div>

      </div>
    </div>
  );
}

export default App;
