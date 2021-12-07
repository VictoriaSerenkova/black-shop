import React, {Component} from "react"
import {formatCurrency, formatTitle} from "../util"
import Filter from "./Filter";

class Products extends Component{
    constructor(props) {
        super(props);
        this.state = {
            products : this.props.products,
            size: "",
            sort: "",
        }
    }

    sortProducts = (event) => {
        const sort = event.target.value;
        console.log(sort);
        this.setState(() => ({
          sort: sort,
          products: this.state.products.slice().sort((a, b) => 
            sort === "Lowest" ? 
              (a.price < b.price ? 1 : -1) 
            : sort === "Highest" ? 
              (a.price > b.price ? 1 : -1)
            : a._id > b._id ? 1 : -1  
          ),
        }));
    }
    
    filterProducts = (event) => {
          console.log(event.target.value);
        if(event.target.value === "ALL") {
          this.setState({
            size: event.target.value,
            products: this.props.products
        })
        } else {
          this.setState({
            size: event.target.value,
            products: this.props.products.filter((product) => product.availableSizes.indexOf(event.target.value) >= 0)
          });
        }
    };

    render() {
        return (
            <div>
                <Filter count = {this.state.products.length} size = {this.state.size} sort = {this.state.sort} filterProducts= {this.filterProducts} sortProducts = {this.sortProducts} />
                <ul className="products">
                {this.state.products.map((product) => (
                       <li key ={product._id}>
                           <div className="product">
                               <a href={"/" + product._id}  onClick = {() => this.props.openProduct(product)}>
                                   <img src={product.image} alt={product.title} />
                                    <p>{formatTitle(product.title)}</p>
                               </a>
                                <div className="product-price">
                                    <div>{formatCurrency(product.price)}</div>
                                    {this.props.userProducts === undefined?
                                    <button className="button primary" onClick = {() => this.props.addToLike(product)} ><i class="far fa-heart"></i></button>
                                    : this.props.userProducts.find(x => x._id === product._id) ?
                                      <button className="button primary" onClick = {() => this.props.addToLike(product)} ><i class="fas fa-heart"></i></button>
                                      :
                                      <button className="button primary" onClick = {() => this.props.addToLike(product)} ><i class="far fa-heart"></i></button>
                                }
                                </div>

                           </div>
                       </li>))}
                </ul>
            </div>
        )
    }
}

export default Products