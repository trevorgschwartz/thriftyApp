import React from 'react';


class BudgetForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: undefined,
            amount: '',
            description: '',
            date: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleExpenseChange = this.handleExpenseChange.bind(this);
        this.handleExpenseSubmit = this.handleExpenseSubmit.bind(this);
    }
    handleExpenseChange(event) {
        let expense = {};
        expense[event.target.name] = event.target.value;
        this.setState(expense);
    }

    handleChange(event) {
        this.setState({selected: event.target.value});
    }

    handleExpenseSubmit(event) {
        event.preventDefault();
       let input = {};
       input.category_id = this.state.selected;
       input.date = this.state.date;
       input.amount = this.state.amount;
       input.description = this.state.description;
       console.log('input', input)
       this.props.saveTransaction(input);
       this.setState({
        selected: undefined,
        amount: '',
        description: '',
        date: ''
       })
    }
    
    render () {
        return(
            <div className="budget-form">
                <h3>New Expense</h3>
                <form onSubmit={this.handleExpenseSubmit}>
                <select onChange={this.handleChange}>
                    <option>Select Category</option>
                    {this.props.categories.map((category, i) => {
                        return (
                        <option key={i} value={category.id}>{category.name}</option>
                        )
                    })}
                </select>
                    <input type="text" name="amount" placeholder="Amount" value={this.state.amount} onChange={this.handleExpenseChange} />
                    <input type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleExpenseChange} />
                    <input type="text" name="date" placeholder="Date" value={this.state.date} onChange={this.handleExpenseChange} />
                    <input type="submit" value="submit" />
                </form>
            </div>
        )
    }
}

export default BudgetForm;


