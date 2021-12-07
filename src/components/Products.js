import React, {Component} from "react"
import {formatCurrency, formatTitle} from "../util"

class Products extends Component{
    constructor(props) {
        super(props);
        this.state = {
            products : this.props.products
        }
    }
    render() {
        return (
            <div>
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