import React, { Component } from "react";
import { loginUsers } from "../redux/actions/userAction";
import "./Login.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class Login extends Component {
    handlelogin = (e) => {
        e.preventDefault();
        const newUser = {
            email: e.target.email.value,
            password: e.target.password.value,
        };
        const data = {
            newUser: newUser,
            history: this.props.history,
        };
        const rgs = this.props.loginUsers(data);
    };
    render() {
        return (
            <div className="register">
                <div className="form parent">
                    <form className="formdata" onSubmit={this.handlelogin}>
                        <div class="form-group">
                            <h2>Login Here</h2>
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

const mapStateToProps = (state) => {
    return { auth: state.user };
};

export default connect(mapStateToProps, { loginUsers })(withRouter(Login));
