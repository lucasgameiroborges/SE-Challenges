import React from 'react';
import './GetOrderBook.css';

export class GetOrderBook extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bids: [],
            asks: []
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
            .then(data => this.setState({ bids: data[0], asks: data[3] }));
        
    }

    render() {
        const { bids, asks } = this.state;
        return (
            <div className="row" style={{color:"white"}}>
            <div className="column">
                
                <table>
                    <p>ammount</p>
                    <tbody className = "bids">{Object.entries(bids).map(([key, value]) => { 
                        return(<div> { parseFloat(value) } </div>)
                    })}</tbody>
                </table>
            </div>
            <div className="column">
                    
                <table>
                    <p>price</p>
                    <tbody className = "bids">{Object.entries(bids).map(([key, value]) => { 
                        return(<div> { parseFloat(key) } </div>)
                    })}</tbody>
                </table>
            </div>
            <div className="column">
                
                <table>
                    <p>price</p>
                    <tbody className = "bids">{Object.entries(asks).map(([key, value]) => { 
                        return(<div> { parseFloat(key) } </div>)
                    })}</tbody>
                </table>
            </div>
            <div className="column">
                    
                <table>
                    <p>ammount</p>
                    <tbody className = "bids">{Object.entries(asks).map(([key, value]) => { 
                        return(<div> { parseFloat(value) } </div>)
                    })}</tbody>
                </table>
            </div>
            </div>
        );
    }
};

export default GetOrderBook;

