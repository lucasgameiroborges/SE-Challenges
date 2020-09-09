var express = require('express');
var cors = require('cors');
var app = express();
const allowedOrigins = ["http://localhost:3000", "http://localhost:3030"];

app.use(
    cors({
        origin: function(origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    "The CORS policy for this site does not " +
                    "allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    })
); 
const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: '<key>',
  APISECRET: '<secret>'
});

var persons = [1, 1, 1, 1, 1, 1, 1, []];
var aux;

// DADOS PARA O ORDERBOOK
binance.websockets.depthCache(['BTCUSDT'], (symbol, depth) => {
  let bids = binance.sortBids(depth.bids);
  let asks = binance.sortAsks(depth.asks);
  persons[0] = bids;
  persons[3] = asks;

  persons[4] = Object.entries(bids).map(([key, value]) => { 
    return( parseFloat(key))
  });
  persons[4].reverse();
  persons[5] = Object.entries(asks).map(([key, value]) => { 
    return( parseFloat(key))
  });
  persons[4] = persons[4].concat(persons[5]);

  persons[6] = Object.entries(bids).map(([key, value]) => { 
    return( parseFloat(value))
  });

  // transformar o persons 6 em sums
  var arrayLength = persons[6].length;
  for (var i = 1; i < arrayLength; i++) {
    persons[6][i] += persons[6][i - 1];
  }
  persons[6].reverse();

  aux = Object.entries(asks).map(([key, value]) => { 
    return( parseFloat(value))
  });

  // transformar o aux em vetor sums
  var arrayLength = aux.length;
  for (var i = 1; i < arrayLength; i++) {
    aux[i] += aux[i - 1];
  }

  persons[6] = persons[6].concat(aux);

persons[7] = persons[4].map((e, i) => [e, Math.trunc(persons[6][i])]);

//persons[7] = persons[7].filter(e => e[1] < 500);
persons[7] = persons[7].filter(e => (e[0] > 0.986 * binance.first(bids)) && (e[0] < 1.013 * binance.first(bids)));
  //res.write(symbol+" depth cache update");
  //res.write("bids", bids);
  //res.write("asks", asks);
  //console.log("best bid: "+binance.first(bids));
  //res.write("best ask: "+binance.first(asks));
  //res.write("last updated: " + new Date(depth.eventTime)); 
});


 // DADOS PARA MONTAR O PRICE CHART
binance.websockets.chart("BTCUSDT", "1m", (symbol, interval, chart) => {
  let tick = binance.last(chart);
  const last = chart[tick].close;
  persons[1] = binance.ohlc(chart);
  //console.info(chart);
  // Optionally convert 'chart' object to array:
  // let ohlc = binance.ohlc(chart);
  // console.info(symbol, ohlc);
  //console.info(symbol+" last price: "+last) 
});


app.get('/', (req,res) => {
	res.send(persons);
});

app.listen(3030);