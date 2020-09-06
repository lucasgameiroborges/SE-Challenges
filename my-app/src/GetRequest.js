import React from 'react';

export class GetRequest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            homes: []
        };
    }

    componentDidMount() {
        // Simple GET request using fetch
        fetch('https://api.hashdex.io/prod/marketdata/v1/index/HDAI/last')
            .then(response => response.json())
            .then(data => this.setState({ homes: data.constituents }));
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
