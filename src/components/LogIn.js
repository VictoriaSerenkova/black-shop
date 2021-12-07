import React, {Component} from "react";

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nik: "",
            password: ""
        }
    }

    handleInput = (event) => {
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value});
    }

    logInUser = (event) => {
        event.preventDefault();
        const user = {
            nik : this.state.nik,
            password: this.state.password
        };
        const users = this.props.users.slice();
        const us = users.find((x) => x.nik === user.nik && x.password === user.password);
        if(!us) {
         alert("Вы не зарегистрированы")
         document.location.href = "/signup"
        }
        else {
            this.props.logInUser(us);}
        
    }

    render() {
        return (
            <div className="login">
                <form onSubmit = {this.logInUser}>
                    <ul className="form-container">
                        <li>ВХОД</li>
                        <li>
                            <label>Nick</label>
                            <input
                               name = "nik"
                               type = "text"
                               required
                               onChange = {this.handleInput}>
                               </input>
                        </li>
                        <li>
                            <label>password</label>
                            <input
                               name = "password"
                               type = "password"
                               required
                               onChange = {this.handleInput}>
                               </input>
                        </li>
                    </ul>
                <button className = "button primary" type = "submit">LogIn</button>
                </form>
            </div>
        )
    }
}

export default LogIn