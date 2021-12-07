import React from "react"
import Products from "./components/Products";
import {Route, Routes} from "react-router-dom";
import data from "./data.json"
import Product from "./components/Product";
import LogIn from "./components/LogIn"
import SignUp from "./components/SignUp"

class App extends React.Component {
    constructor() {
        super()
        this.state ={
            products: data.products,
            product: JSON.parse(localStorage.getItem("product"))? JSON.parse(localStorage.getItem("product")) : null,
            users: JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [],
            userProducts: JSON.parse(localStorage.getItem("userProducts")) ? JSON.parse(localStorage.getItem("userProducts")) : [],
            logUser: JSON.parse(localStorage.getItem("logUser"))? JSON.parse(localStorage.getItem("logUser")) : null,
        }
    }
    logInUser = (user) => {
        this.setState({logUser: user})
        localStorage.setItem("logUser", JSON.stringify(user));
        document.location.href = "/"
    }
    
    signUpUser = (user) => {
        const users = this.state.users.slice();
        const userProducts = this.state.userProducts.slice();
        let alreadyIsLogin = false;
        users.forEach(item => {
          if(item.nik === user.nik) {
            alreadyIsLogin = true;
            alert("Пользователь с таким именем уже существует");
          }
        });
        if(!alreadyIsLogin) {
          users.push({...user});
          userProducts.push({nik: user.nik, products:[]})
          alert("Вы успешно зарегистрированы")
          document.location.href = "/"
        }
        this.setState({users: users, userProducts: userProducts});
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("userProducts", JSON.stringify(userProducts));
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

    removeFromLike = (product) =>{
        const userProducts = this.state.userProducts.slice();
        const logUserProducts = userProducts.find(x => x.nik === this.state.logUser.nik).products.slice();
        const results = logUserProducts.filter(x => x._id !== product._id)
        this.setState({
          userProducts: userProducts.map(x => {
            if(x.nik === this.state.logUser.nik){
              x.products = results.slice();
            }
            return x;
          }),
        });
        localStorage.setItem("userProducts", JSON.stringify(this.state.userProducts));
    };
    
    addToLike = (product) =>{
        if(this.state.logUser === null)
        {
          document.location.href = "/login"
        } else {
          const log = this.state.userProducts.slice()
          const logUserProducts = log.find((item) => item.nik === this.state.logUser.nik);
          let already = false;
          logUserProducts.products.forEach(item => {
            if(item._id === product._id) {
              already = true;
              this.removeFromLike(product)
            }
          });
          if(!already) {
            logUserProducts.products.push({...product});
          }
          const result  = log.map(x =>
            {
              return x.nik === logUserProducts.nik ? logUserProducts : x
            })
          this.setState({userProducts: result})
          localStorage.setItem("userProducts", JSON.stringify(result));
        }
    }

    render() {
        return (
            <div className="grid-container">
                <header>
                    <a href = "/">Black Shop</a>
                    {this.state.logUser === null ?
                    (<div>
                        <a href = "/login"><button>Login</button></a>
                        <button><a href = "/signup">SingUp</a></button>
                    </div>) 
                    : 
                    (<div> 
                        {this.state.logUser.name}
                        <button onClick = {() => {localStorage.setItem("logUser", JSON.stringify(null));}}><a href = "/">Exit</a></button>
                    </div>)}
                </header>
                <main>
                    <div className="content">
                        <div className="main">
                            <Routes>
                                <Route path = "/login" element={<LogIn users = {this.state.users} logInUser = {this.logInUser}/>} />
                                <Route path="/signup" element={<SignUp users = {this.state.users} signUpUser = {this.signUpUser}/>}/>
                                <Route path="/" element = {this.state.logUser === null? <Products products={this.state.products} addToLike = {this.addToLike} openProduct = {this.openProduct}/> : 
                                    <Products  userProducts = {this.state.userProducts.find(x => x.nik === this.state.logUser.nik).products.slice()} products={this.state.products} addToLike = {this.addToLike} openProduct = {this.openProduct}/>} exact/>
                                {this.state.product === null? false:
                                <Route path={"/" + this.state.product._id} element= {this.state.logUser === null? 
                                    <Product userProducts = {[]} product = {this.state.product} addToLike = {this.addToLike} closeProduct = {this.closeProduct} />
                                    :
                                    <Product userProducts = {this.state.userProducts.find(x => x.nik === this.state.logUser.nik).products.slice()} product = {this.state.product} addToLike = {this.addToLike} closeProduct = {this.closeProduct} />}/>}
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
