import React from 'react';
import GetRequest from './GetRequest.js';
import './App.css';

const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: '<key>',
  APISECRET: '<secret>'
});

binance.websockets.depthCache(['BNBBTC'], (symbol, depth) => {
  let bids = binance.sortBids(depth.bids);
  let asks = binance.sortAsks(depth.asks);
  console.info(symbol+" depth cache update");
  console.info("bids", bids);
  console.info("asks", asks);
  console.info("best bid: "+binance.first(bids));
  console.info("best ask: "+binance.first(asks));
  console.info("last updated: " + new Date(depth.eventTime));
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
