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
            <div className="container is-spaced">
                <form onSubmit={this.handleExpenseSubmit}>
                <h2 className="is-spaced">New Expense</h2>
                <div className="field is-spaced">
                <div className="select is-small is-spaced">
                <select onChange={this.handleChange}>
                    <option>Select Category</option>
                    {this.props.categories.map((category, i) => {
                        return (
                        <option key={i} value={category.id}>{category.name}</option>
                        )
                    })}
                </select>
                </div>
                </div>
                <div className="field is-spaced">
                    <input className="input is-small is-rounded is-spaced" type="text" name="amount" placeholder="Amount" value={this.state.amount} onChange={this.handleExpenseChange} />
                </div>
                <div className="field is-spaced">
                    <input className="input is-small is-rounded is-spaced" type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleExpenseChange} />
                </div>
                <div className="field is-spaced">
                    <input className="input is-small is-rounded is-spaced" type="text" name="date" placeholder="Date" value={this.state.date} onChange={this.handleExpenseChange} />
                </div>  
                <div className="field is-spaced">
                    <button className="button is-info is-small is-spaced" type="submit" value="submit">Submit</button>
                </div> 
                </form>
            </div>
        )
    }
}

export default BudgetForm;


