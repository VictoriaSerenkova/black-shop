import React, {Component} from "react";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            nik: "",
            password: ""
        }
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    signUpUser = (event) => {
        event.preventDefault();
        const user = {
            name: this.state.name,
            nik : this.state.nik,
            password: this.state.password
        };
        this.props.signUpUser(user);
    }

    render() {
        return (
            <div className="login">
                <form onSubmit = {this.signUpUser}>
                    <ul className="form-container">
                        <li>РЕГИСТРАЦИЯ</li>
                    <li>
                            <label>Name</label>
                            <input
                               name = "name"
                               type = "text"
                               required
                               onChange = {this.handleInput}>
                               </input>
                        </li>
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
                    <button className = "button primary" type = "submit">Sign Up</button>
                </form>
            </div>
        )
    }
}

export default SignUp