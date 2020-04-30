import React from "react";
import axios from 'axios';
import Axios from "axios";
import TransactionList from "./TransactionList.jsx";
import BudgetForm from './BudgetForm.jsx';
import AddCategory from './AddCategory'
import Piechart from './Piechart'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            categories: [],
            income: 0,
            incomeSubmit: '',
            transactionByCategory: [],
            categoryTotals: {

            }

        };
        this.handleIncomeChange = this.handleIncomeChange.bind(this);
        this.handleIncomeSubmit = this.handleIncomeSubmit.bind(this);
        this.saveTransaction = this.saveTransaction.bind(this);
        this.addCategory = this.addCategory.bind(this);
    }
  
  componentDidMount() {
      this.getAllCategories()
     
      this.getIncome(); 
      
    }
  

   getIncome() {
        axios.get('api/income')
        .then(res => {
            const income = res.data;
            
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
      
      Axios.get('/api/getCategories')
      .then(results => {
        
        let array = results.data;
        array.sort((a, b) => {
          return a.id - b.id;
        })
        this.setState({
          categories: array
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
      this.state.categories.map(category => {
        
        Axios.post('/api/getByCategory', category)
        .then((result) => {
          result.data.map(transaction => {
            transaction.categoryName = category.name
          })
          transactionArray.push(result.data)
        })
        .then(() => {
          this.setState({
            transactionByCategory: transactionArray
          })
        })
        .then(() => {
          this.categoryTotals()
        })
        .catch(err => {
          console.log('error getting TransactionByCategory client', err)
        })
    })
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
    .then((data)=> {
      this.getAllCategories()
      })
    .catch(err => {
      console.log('error adding category', err)
    })
  }

  categoryTotals() {
    let totalCatTotal = [];
    console.log('transactionByCategory', this.state.transactionByCategory)
    this.state.transactionByCategory.map(category => {
    
      let individualCatTotal = {}
      let total = 0;
      category.map(individualCategory => {
        total += individualCategory.amount;
        
      })
      console.log('total', total)
      individualCatTotal.quantity = total;
      individualCatTotal.label = category[0].categoryName;
      totalCatTotal.push(individualCatTotal)
    })
    let obj = {}
    obj.totals = totalCatTotal
    obj.width = 500;
    obj.height = 500;
    this.setState({
      categoryTotals: obj
    })
    let data = obj;
    this.setState({
      data: data
    })
  }


    render() {
        return (
            
            
            <div className="section">
                <div>
                <Piechart />

                </div>
                <h1 className="title container">Thrifty App</h1>
                <h2 className="subtitle container">Tame your spending</h2>
                <form onSubmit={this.handleIncomeSubmit}>
                <div>
                    What is your Monthly Net Income?
                    <input type="text" placeholder="Input Income" value={this.state.incomeSubmit} onChange={this.handleIncomeChange} />
                </div>
                <div>
                    <input type="submit" value="submit" />
                </div>
                </form>
                <div>
                  <BudgetForm saveTransaction={this.saveTransaction} categories={this.state.categories}/>
                </div>
                <div>
                  <AddCategory addCategory={this.addCategory}/>
                </div>
                <div className="column is-mobile">
                  {this.state.transactionByCategory.map((transactionCategory, i) => {
                    if (transactionCategory.length > 0) {
                      return <TransactionList key={i} transactionCategory={transactionCategory} i={i} categories={this.state.categories}/> 
                    } 
                  })}
                  

                </div>
            </div>
        );
    }
}

export default App;

