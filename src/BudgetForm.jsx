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
    }


    render () {
        return(
            <div className="budget-form">
                <h3>New Expense</h3>
                <select onChange={this.handleChange}>
                    <option>Select Category</option>
                    {this.props.categories.map((category, i) => {
                        <option key={i} value={category.id}>{category.name}</option>
                    })}
                </select>
                <form onSubmit={this.handleExpenseSubmit}>
                    <input type="text" placeholder="Amount" value={this.state.amount} onChange={this.handleExpenseChange} />
                    <input type="text" placeholder="Description" value={this.state.description} onChange={this.handleExpenseChange} />
                    <input type="text" placeholder="Date" value={this.state.date} onChange={this.handleExpenseChange} />
                    <input type="submit" value="submit" />
                </form>
            </div>
        )
    }
}


