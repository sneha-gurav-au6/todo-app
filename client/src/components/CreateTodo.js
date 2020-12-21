import React, { Component } from "react";
import "./CreateTodo.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { create } from "../redux/actions/userAction";
import axios from "axios";
class CreateTodo extends Component {
    handleTodo = async (e) => {
        e.preventDefault();
        if (this.props.history.location.state) {
            const data1 = {
                id: this.props.history.location.state,
                title: e.target.title.value,
                description: e.target.description.value,
            };
            const data = await axios.post(
                "/edit/todo",
                data1
            );
            if (data.status === 200) {
                this.props.history.push("/todo");
            }
        } else {
            const data1 = {
                title: e.target.title.value,
                description: e.target.description.value,
            };
            const newData = {
                data: data1,
                history: this.props.history,
            };
            this.props.create(newData);
        }
    };

    render() {
        return (
            <div className="create">
                <form onSubmit={this.handleTodo} className="inner">
                    <div class="form-group ">
                        <h4>Enter Todo Title</h4>
                        <input
                            type="text"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            name="title"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <h4>Some Important Point To Remember</h4>

                        <textarea
                            class="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            name="description"
                            required
                        ></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary">
                        Done 👍
                    </button>
                </form>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state,
    };
};

export default connect(mapStateToProps, { create })(withRouter(CreateTodo));
