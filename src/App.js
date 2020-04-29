import React from "react";
import axios from 'axios';
import Axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            categories: [],
            
            income: 0,
            incomeSubmit: ''

            
            transactionByCategory: []

        };
        this.handleIncomeChange = this.handleIncomeChange.bind(this);
        this.handleIncomeSubmit = this.handleIncomeSubmit.bind(this);

        
    }
  
  componentDidMount() {
      this.getAllCategories(() => {
        this.getTransactionByCategory()
      })
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

    

    getAllCategories(callback) {
      Axios.get('/api/getCategories')
      .then(results => {
        // console.log('results', results)
        let array = results.data;
        array.sort((a, b) => {
          return a.id - b.id;
        })
        this.setState({
          categories: array
        }, () => {
          console.log('category state', this.state.categories)
        })
      })
      .then(()=> {
        callback()
      })
      .catch(err => {
        console.log("error getting categories client", err)
      })
    }

    getTransactionByCategory() {
      let transactionArray = [];
      console.log('category in gettransactionbycategory', this.state.categories)
      this.state.categories.map(category => {
        
        Axios.post('/api/getByCategory', category)
        .then((result) => {
          transactionArray.push(result.data)
        })
        .then(() => {
          this.setState({
            transactionByCategory: transactionArray
          })
        })
        .catch(err => {
          console.log('error getting TransactionByCategory client', err)
        })
    })
    console.log('transaction Array', transactionArray)
  }

  saveTransaction() {
    Axios.post('/api/save', transaction)
    .then(() => {
      this.getTransactionByCategory()
    })
    .catch(err => {
      console.log('error saving transaction client', err)
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