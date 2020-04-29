import React from "react";
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            categories: [],
            income: null
        };
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