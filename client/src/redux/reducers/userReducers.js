import {
    RegisterUser,
    LoginUser,
    UserProfile,
    Get_todos
} from "../actions/usertype";
import isEmpty from "../../utils/is-Empty";
const INITIAL_STATE = {
    isAuthenticated: false,
    user: {},
    RegisterUser: {},
    UserProfile: null,
    allTodos:null
};

const userReducer = (state = INITIAL_STATE, action) => {
    const type = action.type;
    const payload = action.payload;
    switch (type) {
        case RegisterUser: {
            return {
                ...state,
                RegisterUser: payload,
            };
        }
        case LoginUser: {
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !isEmpty(action.payload),
            };
        }
        case UserProfile: {
            return {
                ...state,
                UserProfile: action.payload,
            };
        }
        case  Get_todos: {
            return {
                ...state,
                allTodos: action.payload,
            };
        }
      

        default:
            return { ...state };
    }
};

export default userReducer;
