import initialState from "./intialState";
import { USER } from "../Actions/ActionTypes";

export var userReducer = (state = initialState.user, action) => {
    switch (action.type) {
        case USER.SET_USERNAME:
            console.log(action.payload, "redux update")
            return state = action.payload;
     
        case USER.SET_ROLE:
            console.log(action.payload, "redux update")
            return {
                ...state,
                role: action.payload
            }
            default:
                return state;
    }
};
