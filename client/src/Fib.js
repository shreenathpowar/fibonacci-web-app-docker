import React, { Component } from 'react';
import axios from 'axios';
import './Submit.css';

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: '',
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({ values: values.data });
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/all');
        this.setState({
            seenIndexes: seenIndexes.data,
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        await axios.post('/api/values', {
            index: this.state.index,
        });
        this.setState({ index: '' });
    };

    renderSeenIndexes() {
        return this.state.seenIndexes.map(({ number }) => number).join(', ');
    }

    renderValues() {
        const entries = [];

        for (let key in this.state.values) {
            entries.push(
                <div key={key} className="Show">
                    Index: {key} | Fibonacci series value: {this.state.values[key]}
                </div>
            );
        }

        return entries;
    }

    render() {
        return (
            <div className="Submit">
                <form onSubmit={this.handleSubmit}>
                    <label className="Label">Enter index:</label>
                    <input type="number"
                        value={this.state.index}
                        onChange={(event) => this.setState({ index: event.target.value })}
                    />
                    <button className="btn">Submit</button>
                </form>

                <h3>Indexes I have seen:</h3>
                {this.renderSeenIndexes()}

                <h3>Calculated Values:</h3>
                {this.renderValues()}
            </div>
        );
    }
}

export default Fib;
