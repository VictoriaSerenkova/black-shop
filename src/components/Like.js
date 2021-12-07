import React, {Component} from "react";
import {formatCurrency, formatTitle} from "../util";

class Like extends Component {
  render() {
      return (
        <div>
          <div>
              {this.props.userProducts.length === 0 ?  (<div className = "like like-header">like is empty</div> )
              : (<div className = "like like-header">you have {this.props.userProducts.length} in the like</div>
              )}
          </div>
          <div>
          <div className="back">
              <a href="/"><button onClick = {() => this.props.closeLike()}>back to list</button></a>
            </div>
              <div className="like">
                  <ul className="like-items">
                      {this.props.userProducts.map(item => (
                          <li key = {item._id}>
                              <div>
                                  <img src={item.image} alt = {item.title}></img>
                              </div>
                              <div>
                                  <div>{formatTitle(item.title)}</div>
                                  <div className="right">
                                      {formatCurrency(item.price)}&nbsp;
                                  <button className="button" onClick={() => this.props.removeFromLike(item)}>
                                      Remove
                                  </button>
                                  </div>
                              </div>
                          </li>
                      ))}
                  </ul>
              </div>
            {this.props.userProducts.length !== 0 && (
                <div className="like">
                <div className="total">
                    <div>
                        Total:&nbsp;
                        {formatCurrency(this.props.userProducts.reduce((a, b) => a + b.price, 0))}
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )
  }
}

export default Like