import React, {Component} from "react";
import {formatCurrency} from "../util";

class Product extends Component{
    render() {
        return (
            <div className="modal-product">
                <div className="back">
                   <a href="/"> <button onClick = {() => this.props.closeProduct()} >back to list</button></a>
                </div>
                <div className="title">
                    <p>{this.props.product.title}</p>
                </div>
                <div className="image">
                    <div className="image-product">
                        <img src = {this.props.product.image} alt = {this.props.product.title}/>
                    </div>
                    
                    <div className="size-product">
                        <p>{formatCurrency(this.props.product.price)}</p>
                        <span>размеры</span>&nbsp;
                        <ul>
                            {this.props.product.availableSizes.map(x => (
                                <li>{x}</li>
                            ))}
                        </ul>
                        <button className="button primary" ><i class="far fa-heart"></i></button>
                    </div>
                </div>
                <div className="description"><p>Описание</p>{this.props.product.description}</div>
            </div>
        )
    }
}

export default Product