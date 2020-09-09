import React from 'react';
import Chart from 'react-apexcharts';

export class GetBookChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            candlesticks: [],
            series: [
              {
                name: "High",
                data: [ [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2]]
              }
            ],
            zoom: {
          enabled: true,
          type: 'x',  
          autoScaleYaxis: false,  
          zoomedArea: {
            fill: {
              color: '#90CAF9',
              opacity: 0.4
            },
            stroke: {
              color: '#0D47A1',
              opacity: 0.4,
              width: 2
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
              color: '#1aff00',
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: 'straight',
                width: 3
              },
              
              grid: {
                borderColor: '#ffffff',
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.2
                },
              },
              
              xaxis: {

                type: 'numeric',
                labels: {
                    style: {
                        colors: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
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
                  text: 'Sum value',
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
        this.timer = setInterval(()=> this.getItems(), 3000);
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
                name: "Sum",
                data: data[7]
              }
            ]}));
        
    }

    render() {
        return (
            <div id="chart">
  <Chart options={this.state.options} series={this.state.series} type="line" width={800} height={410} />
</div>);
    }
};

export default GetBookChart;
