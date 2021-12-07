import React from "react"
import Products from "./components/Products";
import {Route, Routes} from "react-router-dom";
import data from "./data.json"
import Product from "./components/Product";
import LogIn from "./components/LogIn"
import SignUp from "./components/SignUp"
import Like from "./components/Like"
import History from "./components/History";

class App extends React.Component {
    constructor() {
        super()
        this.state ={
            products: data.products,
            product: JSON.parse(localStorage.getItem("product"))? JSON.parse(localStorage.getItem("product")) : null,
            users: JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [],
            userProducts: JSON.parse(localStorage.getItem("userProducts")) ? JSON.parse(localStorage.getItem("userProducts")) : [],
            logUser: JSON.parse(localStorage.getItem("logUser"))? JSON.parse(localStorage.getItem("logUser")) : null,
            history :JSON.parse(localStorage.getItem("history")) ? JSON.parse(localStorage.getItem("history")) : [],
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
        const history = this.state.history.slice();
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
          history.push({nik: user.nik, products:[]})
          alert("Вы успешно зарегистрированы")
          document.location.href = "/"
        }
        this.setState({users: users, userProducts: userProducts, history:history});
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("userProducts", JSON.stringify(userProducts));
        localStorage.setItem("history", JSON.stringify(history));
    }

    openProduct = (product) => {
        if(this.state.logUser !== null) {
          const history = this.state.history.find(x => x.nik === this.state.logUser.nik).products
          const newHistory = history.filter(x => x._id !== product._id).slice()
          newHistory.push({...product})
          const result = this.state.history.map(x => {
            if(x.nik === this.state.logUser.nik) {
              x.products = newHistory
            }
            return x;
          })
          this.setState({
            history: result,
          });
          localStorage.setItem("history", JSON.stringify(this.state.history));
        }
        this.setState({
          product: product,
          product_path: "/"+product._id
        });
        localStorage.setItem("product", JSON.stringify(product));
        console.log(this.state.product_path)
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
                        <button><a href = "/history">History</a></button>
                        <a href = "/favorites"><i class="far fa-heart"></i></a>
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
                                <Route path="/history" element = {this.state.logUser === null? <LogIn user = {this.state.users} logInUser = {this.logInUser} /> : <History history = {this.state.history.find(x => x.nik === this.state.logUser.nik).products}  addToLike = {this.addToLike} openProduct = {this.openProduct} userProducts = {this.state.userProducts.find(x => x.nik === this.state.logUser.nik).products} />} />
                                <Route path="/favorites" element = {this.state.logUser === null? <LogIn users = {this.state.users} logInUser = {this.logInUser} /> : <Like  userProducts = {this.state.userProducts.find(x => x.nik === this.state.logUser.nik).products.slice()} removeFromLike = {this.removeFromLike} closeLike = {this.closeLike}/>}/>
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
