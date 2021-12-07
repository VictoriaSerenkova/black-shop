import React, {Component} from "react";
import {formatTitle} from "../util"

class  History extends Component{
    
    render() {
        return(
            <div className='history'>
                {this.props.history.length > 0?
                (<ul className="history-items">
                   {this.props.history.reverse().map((product) => (
                       <li key ={product._id}>
                           <div className="history-product">
                               <a href={"/" + product._id} onClick = {() => this.props.openProduct(product)}>
                                   <img src={product.image} alt={product.title} />
                                    <p>{formatTitle(product.title)}</p>
                               </a>
                               <div className="product-price">
                                    {this.props.userProducts.find(x => x._id === product._id) ?
                                      <button className="button primary" onClick = {() => this.props.addToLike(product)} ><i class="fas fa-heart"></i></button>
                                      :
                                      <button className="button primary" onClick = {() => this.props.addToLike(product)} ><i class="far fa-heart"></i></button>
                                    }
                                </div>

                           </div>
                       </li>
                   ))} 
                </ul>) : <div>Ваша история пуста</div>}
            </div>
        )
    }
}


export default History