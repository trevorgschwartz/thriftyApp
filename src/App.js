import React from "react";
import axios from 'axios';
import Axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            categories: [],
            income: null,
            transactionByCategory: []
        };
    }

    componentDidMount() {
      this.getAllCategories(() => {
        this.getTransactionByCategory()
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
                <div>
                    What is your Monthly Net Income?
                    {/* <input onSubmit ref={input = } type="text" /> */}
                </div>
                <div>
                    <button id="submit">Submit</button>
                </div>
            </div>
        );
    }
}

export default App;