import React from "react"
import Products from "./components/Products";
import {Route, Routes} from "react-router-dom";
import data from "./data.json"
import Product from "./components/Product";

class App extends React.Component {
    constructor() {
        super()
        this.state ={
            products: data.products,
            product: JSON.parse(localStorage.getItem("product"))? JSON.parse(localStorage.getItem("product")) : null,
            product_path: null
        }
    }
    openProduct = (product) => {
        this.setState({
          product: product
        });
        localStorage.setItem("product", JSON.stringify(product));
        console.log(this.state.product)
    }
    
    closeProduct = () => {
        this.setState({product: null});
        localStorage.setItem("product", JSON.stringify(null))
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
                                <Route path="/" element={<Products products = {this.state.products} openProduct = {this.openProduct}/>}></Route>
                                {this.state.product === null? false :
                                <Route path={"/" + this.state.product._id} element = {<Product product = {this.state.product} closeProduct = {this.closeProduct} />}/>
                                }
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
