import "./App.css";
import { useState } from "react";
import img from "./image/ban.jpg";
import Home from "./Pages/Home";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Todo from "./Pages/Todo";
import Welcome from "./Pages/Welcome";
import Register from "./components/Register";
import jwt_decode from "jwt-decode";
import login from "./components/Login";
import setAuthToken from "./redux/actions/setAuthToken";
import { setCurrentUser, Get_All_todos } from "./redux/actions/userAction";
import CreateTodo from "./components/CreateTodo";
import { Create_todo } from "./redux/actions/usertype";
import axios from "axios";
class App extends Component {
    componentDidMount() {
        if (localStorage.jwtToken) {
            setAuthToken(localStorage.jwtToken);
            const decode = jwt_decode(localStorage.jwtToken);
            this.props.setCurrentUser(decode);
            this.props.Get_All_todos();
        }
    }

    render() {
        return (
            <div className="App">
                <Home />
                <Switch>
                    <Route exact path="/" component={Welcome} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={login} />
                    <Route exact path="/todo" component={Todo} />
                    <Route exact path="/create-todo" component={CreateTodo} />
                    <Route exact path="/edit-todo" component={CreateTodo} />
                </Switch>
            </div>
        );
    }
}

export default connect(null, { setCurrentUser, setAuthToken, Get_All_todos })(
    App
);
