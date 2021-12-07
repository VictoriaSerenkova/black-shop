import React, {Component} from "react"
import {formatCurrency, formatTitle} from "../util"
import Filter from "./Filter";
import SearchInput from "./SearchInput";
import Search from "./Search"

class Products extends Component{
    constructor(props) {
        super(props);
        this.state = {
            products : this.props.products,
            size: "",
            sort: "",
            items:[],
            countItemToShow: 5,
            key:"",
            searcheProducts : [],
            searche: ""
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
    
    handleInput = (event) => {
        const items = this.props.products.filter(x => x.title.indexOf(event.target.value) !== -1 )
        this.setState({
            items: items,
            searche:event.target.value,
            countItemToShow: items<5? items.length : 5,
            key:""
        })
    }

    submitSearch = (event) =>{
        event.preventDefault();
        const searcheProducts = this.props.products.filter(x => x.title.indexOf(event.target.value) !== -1 ).slice()
        if(event.key === "Enter")
        {
          this.setState({items:[], searche:event.target.value, searcheProducts, key:"Enter"})
        }
    }
    handle = (title) => {
        console.log(title);
          this.setState({
              searche: title,
              items:[],
              key:"Enter",
              searcheProducts: this.props.products.filter(x => x.title.indexOf(title) !== -1 ).slice()
          })
    }

    render() {
        return (
            <div>
                <Filter count = {this.state.products.length} size = {this.state.size} sort = {this.state.sort} filterProducts= {this.filterProducts} sortProducts = {this.sortProducts} />
                <input className="search" placeholder="Поиск" type="text" onKeyUp = {this.submitSearch} onChange = {this.handleInput} value = {this.state.searche}/>
                {(this.state.items.length === 0 || this.state.searche === "")? <div></div>:
                <SearchInput items = {this.state.items} countItemToShow = {this.state.countItemToShow} handle = {this.handle}/>}
                {this.state.key !== "Enter" ? 
                (<ul className="products">
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
                </ul>)
                :
                <Search searche = {this.state.searche} searcheProducts = {this.state.searcheProducts} openProduct= {this.props.openProduct} userProducts = {this.props.userProducts} addToLike = {this.props.addToLike}></Search>}
            </div>
        )
    }
}

export default Products