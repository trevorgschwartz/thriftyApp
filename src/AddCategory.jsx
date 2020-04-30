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
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleCategorySubmit}>
                <h2>Add New Category</h2>
                <div className="field is-spaced">
                    <input className="input is-small is-rounded is-spaced" type="text"  placeholder="Category" value={this.state.category} onChange={this.handleCategoryChange} />
                </div>
                <div className="field is-spaced">   
                    <button className="button is-info is-small is-spaced" type="submit" value="submit">Submit</button>
                </div>
                </form>
            </div>
        )
    }
}

export default AddCategory;