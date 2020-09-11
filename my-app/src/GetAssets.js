import React from 'react';

export class GetAssets extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            homes: [],
            depth: [],
            chart: [],
            candlesticks: []
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
        
        fetch('https://api.hashdex.io/prod/marketdata/v1/index/HDAI/last')
            .then(response => response.json())
            .then(data => this.setState({ homes: data.constituents }));
        
    }

    handleClick(home) { 
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
            <div className="row" style={{color:"white"}}>
            <div className="column">
                <table>
                    
                    <tbody>
                        {homes.map(home => 
                            <div 
                            onClick={() => this.handleClick(home)} 
                            style={{cursor:'pointer'}}
                            onMouseEnter={(event) => this.mouse(event)}
                            onMouseLeave={(event) => this.mouseout(event)}>
                            {home.assetName} 
                            </div>)
                        }
                    </tbody>
                </table>
            </div>
            <div className="column">
                <table>
                
                <tbody>{homes.map(home => <div>{parseFloat(home.currentPrice).toFixed(2)}</div>)}</tbody>
                </table>
            </div>
            </div>
        );
    }
};

export default GetAssets;
