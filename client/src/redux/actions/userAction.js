import { RegisterUser, LoginUser, Get_todos } from "./usertype";
import jwt_decode from "jwt-decode";
import setAuthToken from "./setAuthToken";
import axios from "axios";

export const RegisterUsers = (data1) => async (dispatch) => {
    await axios
        .post("/user/register", data1.newUser)
        .then((res) => {
            if (res.status === 200) {
                dispatch({ type: RegisterUser, payload: res.data.user });
                data1.history.push("/login");
            }
            dispatch({ type: RegisterUser, payload: res.data.user });
        })
        .catch((err) => {
            console.log(err.message);
        });
};
export const Get_All_todos = () => async (dispatch) => {
    await axios
        .post("/user/todo")
        .then((res) => {
            if (res.status === 200) {
                dispatch({ type: Get_todos, payload: res.data.data });
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
};
export const create = (data) => async (dispatch) => {
    await axios
        .post("/user/create-todo", data.data)
        .then((data1) => {
            if (data1.status === 200) {
                data.history.push("/todo");
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
};
export const loginUsers = (data) => async (dispatch) => {
    await axios
        .post("/user/login", data.newUser)
        .then((data1) => {
            if (data1.status === 200) {
                setToken(data1.data.token, dispatch);
                data.history.push("/todo");
            }
            // setToken(data1.data.token, dispatch);
        })
        .catch((err) => {
            console.log(err.message);
        });
};

const setToken = (res, dispatch) => {
    // Save token to local storage
    const token = res;
    // Set token to ls
    localStorage.setItem("jwtToken", token);
    // Set token to Auth header
    setAuthToken(token);
    // Decode jwt token
    const decode = jwt_decode(token);
    // Set current user
    dispatch(setCurrentUser(decode));
};
export const setCurrentUser = (decode) => {
    return { type: LoginUser, payload: decode };
};
export const logoutUser = () => (dispatch) => {
    // Remove token from localStorage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future request
    setAuthToken(false);
    // Set current user to {} and isAuthenticator to false
    dispatch(setCurrentUser({}));
};
