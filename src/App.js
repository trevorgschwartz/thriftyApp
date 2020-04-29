import React from "react";
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            categories: [],
            income: 0,
            incomeSubmit: ''
        };
        this.handleIncomeChange = this.handleIncomeChange.bind(this);
        this.handleIncomeSubmit = this.handleIncomeSubmit.bind(this);

        
    }

    getIncome() {
        axios.get('api/income')
        .then(res => {
            const income = res.data;
            console.log(income);
            this.setState({income: income});
        })
        .catch(err => {
            console.log(err);
        })
    }
    handleIncomeChange(event) {
        console.log('event: ', event);
        let incomeSubmit = {};
        incomeSubmit.incomeSubmit = event.target.value;
        this.setState(incomeSubmit);
    }
    handleIncomeSubmit(e) {
        e.preventDefault();
        this.saveIncome(this.state.incomeSubmit);
        this.setState({
            incomeSubmit: ''
        })
    }
    saveIncome(income) {
        let newIncome = {
            income: income
        };
        axios.post('api/income', newIncome)
        .then(() => {
            console.log('sending income: ', income)
            this.getIncome();
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className="app">
                <header><h1 className="main">Thrifty</h1></header>
                <form onSubmit={this.handleIncomeSubmit}>
                <div>
                    What is your Monthly Net Income?
                    <input type="text" placeholder="Input Income" value={this.state.incomeSubmit} onChange={this.handleIncomeChange} />
                </div>
                <div>
                    <input type="submit" value="submit" />
                </div>
                </form>
            </div>
        );
    }
}

export default App;

// value={this.state.income} onChange={this.handleIncomeChange} 