import React from 'react';
import Chart from 'react-apexcharts';

export class GetPriceChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            homes: [{id: "1m"},
                    {id: "3m"},
                    {id: "5m"},
                    {id: "15m"},
                    {id: "30m"},
                    {id: "1h"},
                    {id: "2h"},
                    {id: "4h"},
                    {id: "6h"},
                    {id: "8h"},
                    {id: "12h"},
                    {id: "1d"},
                    {id: "3d"},
                    {id: "1w"},
                    {id: "1M"},],
            candlesticks: [],
            series: [
              {
                name: "High",
                data: [28, 29, 33, 36, 32, 32, 33]
              },
              {
                name: "Low",
                data: [12, 11, 14, 18, 17, 13, 13]
              }
            ],
            zoom: {
          enabled: true,
          type: 'xy',  
          autoScaleYaxis: false,  
          zoomedArea: {
            fill: {
              color: '#90CAF9',
              opacity: 0.4
            },
            stroke: {
              color: '#0D47A1',
              opacity: 0.4,
              width: 1
            }
          }
      },
            options: {
              chart: {
                height: 350,
                type: 'line',
                dropShadow: {
                  enabled: true,
                  color: '#000',
                  top: 10,
                  left: 7,
                  blur: 10,
                  opacity: 0.2
                },
                toolbar: {
                  show: false
                }
              },
              colors: ['#1aff00', '#77B6EA'],
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: 'straight',
                width: 1
              },
              
              grid: {
                borderColor: '#ffffff',
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.2
                },
              },
              
              xaxis: {
                categories: Array.from(Array(500).keys()),
                labels: {
                    show: false,
                },
                title: {
                  text: 'Most recent trades',
                  style: {
                        color: '#ffffff',
                    }
                }
              },
              yaxis: {
                labels: {
                    style: {
                        colors: ['#ffffff'],
                    }
                },
                title: {
                  text: 'Price (USD)',
                  style: {
                        color: '#ffffff',
                    }
                }
              },
              legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
              }
            },
          
        };
    }

    componentDidMount() {
        this.timer = setInterval(()=> this.getItems(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null; 
    }

    getItems() {
        // Simple GET request using fetch

        fetch('http://localhost:3030/')
            .then(response => response.json())
            .then(data => this.setState({series: [
              {
                name: "High",
                data: data[1].high
              },
              {
                name: "Low",
                data: data[1].low
              }
            ]}));
        
    }

    handleClick(home) { 
        console.log(home)
    fetch('http://localhost:3030/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(home)
      }).then((res) => {
    console.log(res)
});
    
    }

    mouse = event => {
        var white = '#db3434'
        const el = event.target
        el.style.color = white
    }

    mouseout = event => {
        var white = '#FFFFFF'
        const el = event.target
        el.style.color = white
    }

    render() {
        const { homes } = this.state;
        return (
            <div id="chart">
                            {homes.map(home => 
                            <div 
                            onClick={() => this.handleClick(home)} 
                            style={{cursor:'pointer', display:"inline", color:"white"}}
                            onMouseEnter={(event) => this.mouse(event)}
                            onMouseLeave={(event) => this.mouseout(event)}>
                            {home.id} - 
                            </div>)
                        }
                        
  <Chart options={this.state.options} series={this.state.series} type="line" height={390} />
</div>);
    }
};

export default GetPriceChart;
