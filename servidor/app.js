var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
var person1, person2, person3;
const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: '<key>',
  APISECRET: '<secret>'
});

persons = [1, 1, 1, 1];

// dados para o orderbook
binance.websockets.depthCache(['BTCUSDT'], (symbol, depth) => {
  let bids = binance.sortBids(depth.bids);
  let asks = binance.sortAsks(depth.asks);
  persons[0] = bids;
  persons[3] = asks;
  //res.write(symbol+" depth cache update");
  //res.write("bids", bids);
  //res.write("asks", asks);
  //res.write("best bid: "+binance.first(bids));
  //res.write("best ask: "+binance.first(asks));
  //res.write("last updated: " + new Date(depth.eventTime)); 
});


 // DADOS PARA MONTAR A SÉRIE HISTÓRICA DO PRICE CHART
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

  // DADOS NOVOS PARA INCLUIR REAL-TIME NO PRICE CHART
// Periods: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
binance.websockets.candlesticks(['BTCUSDT'], "1m", (candlesticks) => {
  let { e:eventType, E:eventTime, s:symbol, k:ticks } = candlesticks;
  let { o:open, h:high, l:low, c:close, v:volume, n:trades, i:interval, x:isFinal, q:quoteVolume, V:buyVolume, Q:quoteBuyVolume } = ticks;
  persons[2] = candlesticks;
  /*console.info(symbol+" "+interval+" candlestick update");
  console.info("open: "+open);
  console.info("high: "+high);
  console.info("low: "+low);
  console.info("close: "+close);
  console.info("volume: "+volume);
  console.info("isFinal: "+isFinal);*/
});


app.get('/', (req,res) => {
	res.send(persons);
});

app.listen(3030);