import React from 'react';


class AddCategory extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            category: ''
        }
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleCategorySubmit = this.handleCategorySubmit.bind(this);
    }

    handleCategoryChange(event) {
        this.setState({
            category: event.target.value
        })
    }

    handleCategorySubmit(e) {
        e.preventDefault()
        this.props.addCategory(this.state)
        this.setState({
            category: ''
        })
    }

    render() {
        return (
            <div className="budget-form">
                <h3>Add New Category</h3>
                <form onSubmit={this.handleCategorySubmit}>
                    <input type="text"  placeholder="Category" value={this.state.category} onChange={this.handleCategoryChange} />
                    <input type="submit" value="submit" />
                </form>
            </div>
        )
    }
}

export default AddCategory;