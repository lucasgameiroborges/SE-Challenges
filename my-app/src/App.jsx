import React from 'react';
import './GetRequest.jsx';
import './App.css';


function App() {

  return (
    <div className="App">

      <div className="left-col">

        <div className = "top">
          <h1>HDAI Index Constituents</h1>
          <GetRequest />
        </div>

        <div className = "bottom">
          <h1>Price Chart</h1>
        </div>

      </div>

      <div className="right-col">

        <div className = "top">
          <h1>Order Book</h1>
        </div>

        <div className = "bottom">
          <h1>Order Book Chart</h1>
        </div>

      </div>
    </div>
  );
}

export default App;
