import React, { Component } from "react";
import "./Register.css";
import { connect } from "react-redux";
import {RegisterUsers} from "../redux/actions/userAction"
class Register extends Component {
    handleSubmit=(e)=>{
        e.preventDefault()
        const newUser = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
        };
         const data = {
             newUser: newUser,
             history:this.props.history
         };
          const rgs = this.props.RegisterUsers(data);
    }
    render() {
        return (
            <div className="register">
                <div className="form parent">
                    <form className="formdata" onSubmit={this.handleSubmit}>
                        <div class="form-group">
                            <h2>Register Here</h2>
                            <label for="exampleInputPassword1">Name</label>
                            <input
                                type="text"
                                class="form-control"
                                id="exampleInputPassword1"
                                required
                                placeholder="Fluppy"
                                name="name"
                            />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">
                                Email address
                            </label>
                            <input
                                type="email"
                                class="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="xyz@email.com"
                                required
                                name="email"
                            />
                            <small id="emailHelp" class="form-text ">
                                We'll never share your email with anyone else.
                            </small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input
                                type="password"
                                class="form-control"
                                id="exampleInputPassword1"
                                required
                                placeholder="Enter Your Password"
                                name="password"
                            />
                        </div>

                        <button type="submit" class="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
const mapstateToProps = (state) => {
    return { auth: state.user };
};

export default connect(mapstateToProps, { RegisterUsers })(
    Register
);