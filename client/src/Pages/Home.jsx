import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userAction";
import { withRouter } from "react-router-dom";
import "./Home.css";
class Home extends Component {
    state = {
        showCollapsedMenu: false,
    };
    handleLogout = (e) => {
        e.preventDefault();
        this.props.logoutUser();
        this.props.history.push("/");
    };
    userDashboard = () => {
        this.props.history.push({
            pathname: "/user-dashboard",
            state: this.props.user.user.user,
        });
    };
    toggleMenu = () => {
        this.setState({
            showCollapsedMenu: !this.state.showCollapsedMenu,
        });
    };
    render() {
        const { isAuthenticated } = this.props.user.user;
        const registerLogin = (
            <>
                <li class="btn btn-warning mr-sm-2">
                    <a
                        class="nav-link"
                        href="/register"
                        style={{ fontWeight: "bold" }}
                    >
                        Register <span class="sr-only">(current)</span>
                    </a>
                </li>
                <li class="btn btn-warning">
                    <a
                        class="nav-link"
                        href="/login"
                        style={{ fontWeight: "bold" }}
                    >
                        Login <span class="sr-only">(current)</span>
                    </a>
                </li>
            </>
        );
        const show = this.state.showCollapsedMenu ? "show" : "";
        const Logout = (
            <>
                <li class="btn btn-warning mr-sm-2">
                    <a
                        class="nav-link"
                        href="/todo"
                        style={{ fontWeight: "bold" }}
                    >
                        ALL Todos <span class="sr-only">(current)</span>
                    </a>
                </li>
                <li class="btn btn-warning mr-sm-2">
                    <a
                        class="nav-link"
                        href="/create-todo"
                        style={{ fontWeight: "bold" }}
                    >
                        Create Todo <span class="sr-only">(current)</span>
                    </a>
                </li>
                <li class="btn btn-warning">
                    <a
                        style={{ fontWeight: "bold" }}
                        class="nav-link"
                        href="/login"
                        onClick={this.handleLogout.bind(this)}
                    >
                        LogOut <span class="sr-only">(current)</span>
                    </a>
                </li>
            </>
        );
        return (
            <div className="Home">
                <nav class="navbar navbar-expand-lg navbar-light bg-light first">
                    <a
                        class="navbar-brand"
                        href="#"
                        style={{ fontWeight: "bolder" }}
                    >
                        TodoApp
                    </a>
                    <button
                        className="navbar-toggler"
                        data-toggle="collapse"
                        data-target="#navbar-menu"
                        type="button"
                        aria-controls="navbarSupportedContent1"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={this.toggleMenu}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className={"collapse navbar-collapse " + show}
                        id="navbarNav"
                    >
                        <div
                            className="collapse navbar-collapse"
                            id="navbar-menu"
                        ></div>
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active"></li>
                        </ul>

                        <ul className="navbar-nav mr-0 my-2 my-lg-0">
                            {" "}
                            {isAuthenticated === false ? registerLogin : Logout}
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state,
    };
};

export default connect(mapStateToProps, { logoutUser })(withRouter(Home));
