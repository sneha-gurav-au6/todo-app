import React, { useState, useEffect } from "react";
import "./Todo.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { create } from "../redux/actions/userAction";
import { Get_All_todos } from "../redux/actions/userAction";
import isEmpty from "../utils/is-Empty";

import axios from "axios";
const Todo = (props) => {
    const [data, setData] = useState(null);
    useEffect(async () => {
        await axios
            .post("/user/todo")
            .then((res) => {
                if (res.status === 200) {
                    setData(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [props.user]);

    const handleEdit = (e) => {
        let id = e.target.id;
        props.history.push({ pathname: "/edit-todo", state: id });
    };
    const handleDelete = (e) => {
        const id = e.target.id;
        const data = {
            id: e.target.id,
        };
        axios
            .post("/delete/todo", data)
            .then((data) => {
                if (data) {
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    return (
        <div className="mainCard">
            {isEmpty(data) ? (
                <h1>Haven't Created Any Todo</h1>
            ) : (
                data.map((e, i) => (
                    <div
                        class="card text-white bg-warning mb-2 child"
                        style={{ maxWidth: "18rem" }}
                    >
                        <div className="title">
                            <p>TODO {i + 1}</p>
                            <p>{new Date(e.date).toUTCString().slice(4, 16)}</p>
                        </div>

                        <div
                            class="card-body "
                            style={{
                                textAlign: "center",
                                marginTop: "-30px",
                            }}
                        >
                            <h5 class="card-title">{e.title}</h5>
                            <p class="card-text">{e.description}</p>
                        </div>

                        <div
                            class="card-body btnN"
                            style={{
                                textAlign: "center",
                                marginTop: "-30px",
                            }}
                        >
                            <a
                                class="btn btn-primary"
                                onClick={handleEdit}
                                id={e._id}
                            >
                                Edit
                            </a>
                            <a
                                class="btn btn-primary "
                                onClick={handleDelete}
                                id={e._id}
                            >
                                Delete
                            </a>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default connect(null, { create, Get_All_todos })(withRouter(Todo));
