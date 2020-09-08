import React from 'react';


export class GetRequest extends React.Component {
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

        fetch('http://localhost:3030/')
            .then(response => response.json())
            .then(data => this.setState({ depth: data[0], chart: data[1], candlesticks: data[2] }));
        
    }

    render() {
        const { homes } = this.state;
        return (
            <div className="row" style={{color:"white"}}>
            <div className="column">
                <table>
                    <h2>Asset</h2>
                    <tbody>{homes.map(home => <div>{home.assetName}</div>)}</tbody>
                </table>
            </div>
            <div className="column">
                <table>
                <h2>Price</h2>
                <tbody>{homes.map(home => <div>{parseFloat(home.currentPrice).toFixed(2)}</div>)}</tbody>
                </table>
            </div>
            </div>
        );
    }
};

export default GetRequest;
