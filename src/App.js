import React from "react"
import Products from "./components/Products";
import {Route, Routes} from "react-router-dom";
import data from "./data.json"

class App extends React.Component {
    constructor() {
        super()
        this.state ={
            products: data.products
        }
    }
    render() {
        return (
            <div className="grid-container">
                <header>
                    <a href = "/">Black Shop</a>
                </header>
                <main>
                    <div className="content">
                        <div className="main">
                            <Routes>
                                <Route path="/" element={<Products products = {this.state.products}/>}></Route>
                            </Routes>
                        </div>
                    </div>
                </main>
                <footer>
                    &copy;&nbsp;&nbsp;2021
                </footer>
            </div>
        )
    }
}

export default App;
