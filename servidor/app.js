var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors');
var app = express();
const allowedOrigins = ["http://localhost:3000", "http://localhost:3030"];
var jsonParser = bodyParser.json();

// autorizações para o proxy
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

// vetor com os dados que serão armazenados no servidor
var dados = [1, 1, 1, 1, 1, 1, 1, []];
var temp = "1m";
var aux;
var simbolo = ['BTC'];

// declaração da API do Binance
const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: '<key>',
  APISECRET: '<secret>',
  'reconnect': false
})

// -----------------------------------------------
// ------funcao que conecta aos websockets--------
// -----------------------------------------------

function websocketConnect(simbolo, temp) {
  var dados = [1, 1, 1, 1, 1, 1, 1, []];
  var aux;

  //--------------------
  // DADOS DO ORDER BOOK
  //-------------------- 
  binance.websockets.depthCache(simbolo, (symbol, depth) => {

    // DADOS 0 e 3: compoem a tabela do orderbook
    // (bids e asks: cada um com dados de preco e volume)
    let bids = binance.sortBids(depth.bids);
    let asks = binance.sortAsks(depth.asks);
    dados[0] = bids; 
    dados[3] = asks;

    // vetor de preços de bids, menor para o maior 
    dados[4] = Object.entries(bids).map(([key, value]) => { 
      return( parseFloat(key))
    });
    dados[4].reverse();

    // vetor de preços de asks, menor para o maior
    dados[5] = Object.entries(asks).map(([key, value]) => { 
      return( parseFloat(key))
    });
    //DADOS 4: vetor de preços do orderbook chart
    dados[4] = dados[4].concat(dados[5]);

    // vetor de volumes de bids
    dados[6] = Object.entries(bids).map(([key, value]) => { 
      return( parseFloat(value))
    });

    // transformar o dados 6 em sums
    var arrayLength = dados[6].length;
    for (var i = 1; i < arrayLength; i++) {
      dados[6][i] += dados[6][i - 1];
    }
    dados[6].reverse();

    // vetor de volumes de asks
    aux = Object.entries(asks).map(([key, value]) => { 
      return( parseFloat(value))
    });

    // transformar o aux em vetor sums
    var arrayLength = aux.length;
    for (var i = 1; i < arrayLength; i++) {
      aux[i] += aux[i - 1];
    }

    // DADOS 6: vetor de volume do order book chart
    dados[6] = dados[6].concat(aux);

    // DADOS 7: compoem o gráfico do order book
    dados[7] = dados[4].map((e, i) => [e, Math.trunc(dados[6][i])]);

    // limites do gráfico do order book
    dados[7] = dados[7].filter(e => (e[0] > 0.986 * binance.first(bids)) && (e[0] < 1.013 * binance.first(bids)));
  
  });


 // DADOS PARA MONTAR O PRICE CHART
  binance.websockets.chart(simbolo[0], temp, (symbol, interval, chart) => {
    let tick = binance.last(chart);
    const last = chart[tick].close;
    dados[1] = binance.ohlc(chart);
  });
  console.log(simbolo);

  return dados;
}

// ----------------------------------------------------------------
// ------Ao apertar o botão no react, ativa o binance aqui --------
// ----------------------------------------------------------------

app.post('/', jsonParser, (req,res) => {
  
  // Termina a conexao dos websockets já declarados 
  let endpoints = binance.websockets.subscriptions();
  for ( let endpoint in endpoints ) {
    console.log(endpoint);
    binance.websockets.terminate(endpoint);
  }
  console.log(req.body);
  if (typeof req.body.id === 'undefined') {
  //prepara o simbolo da moeda a ser analisada
  simbolo[0] = req.body.assetId;
  simbolo[0] = simbolo[0].concat("USDT");
} else {
  temp = req.body.id
}

  dados = websocketConnect(simbolo, temp);

});
// --------------------------------------------
// ------chamada inicial do Binance API--------
// --------------------------------------------

simbolo[0] = simbolo[0].concat("USDT");
dados = websocketConnect(simbolo, temp)


app.get('/', (req,res) => {
	res.send(dados);
});

app.listen(3030);
