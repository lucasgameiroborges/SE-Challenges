import React from 'react';
import Chart from 'react-apexcharts';

export class GetOrderChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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

    render() {
        return (
            <div id="chart">
  <Chart options={this.state.options} series={this.state.series} type="line" height={420} />
</div>);
    }
};

export default GetOrderChart;
