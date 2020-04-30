import React from "react";
import axios from 'axios';
import Axios from "axios";
import TransactionList from "./TransactionList.jsx";
import BudgetForm from './BudgetForm.jsx';
import AddCategory from './AddCategory';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            categories: [],
            income: 0,
            incomeSubmit: '',
            transactionByCategory: []

        };
        this.handleIncomeChange = this.handleIncomeChange.bind(this);
        this.handleIncomeSubmit = this.handleIncomeSubmit.bind(this);
        this.saveTransaction = this.saveTransaction.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.getAllCategories = this.getAllCategories.bind(this);
        
  
    }
  
  componentDidMount() {
      this.getAllCategories()
      this.getIncome(); 
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
      let incomeSubmit = {};
      incomeSubmit.incomeSubmit = event.target.value;
      this.setState(incomeSubmit);
  }
  handleIncomeSubmit(e) {
      e.preventDefault();
      if (this.state.income.length ===  0) {
        this.saveIncome(this.state.incomeSubmit);
      } else {
        let id = this.state.income[0].id;
        this.updateIncome(this.state.incomeSubmit, id);
      }
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
          this.getIncome();
      })
      .catch(err => {
          console.log(err);
      })
  }

  updateIncome(income, id) {
    let newIncome = {
      income: income,
      id: id
    };
    axios.post('api/incomeupdate', newIncome)
    .then(() => {
      this.getIncome();
    })
    .catch(err => {
      console.log(err);
    })
  }

    

    getAllCategories() {
      console.log('getting categories running')
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
        this.getTransactionByCategory()
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

  saveTransaction(newTransaction) {
    Axios.post('/api/save', newTransaction)
    .then((data)=> {
      this.getAllCategories()
      })
    
    .catch(err => {
      console.log('error saving transaction client', err)
    })
  }

  addCategory(newCategory) {
    Axios.post('/api/addCategory', newCategory)
    .then((result) => {
      this.getAllCategories()
      })
    .catch(err => {
      console.log('error adding category', err)
    })
  }

    render() {
        return (
            <div className="section">
              <div class="columns is-spaced">
              <div className="column is-one-third">
              <div className="container is-spaced">
                <form onSubmit={this.handleIncomeSubmit}>
                    <h2>What is your Monthly Net Income?</h2>
                    <div class="field has-addons">
                      {/* <div class='control'> */}
                        <input className="input is-small is-rounded is-spaced" type="text" placeholder="Input Income" value={this.state.incomeSubmit} onChange={this.handleIncomeChange} />
                      {/* </div> */}
                      {/* <div class="control"> */}
                      <input className="submit" type="submit" value="submit" />
                      {/* </div> */}
                    </div>
                </form>
                </div>
                <div className="container is-spaced padding-top">
                  <BudgetForm saveTransaction={this.saveTransaction} categories={this.state.categories}/>
                </div>
                <div className="container is-spaced"></div>
                <div>
                  <AddCategory addCategory={this.addCategory}/>
                </div>
                </div>
                <div className="column is-two-thirds is-mobile">
                  {this.state.transactionByCategory.map((transactionCategory, i) => {
                    if (transactionCategory.length > 0) {
                      return <TransactionList key={i} transactionCategory={transactionCategory} i={i} categories={this.state.categories}/> 
                    } 
                  })}
                </div>
                </div>
            </div>
        );
    }
}

export default App;

// value={this.state.income} onChange={this.handleIncomeChange} 