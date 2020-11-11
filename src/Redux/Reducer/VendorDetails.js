import initialState from "./intialState";
import { DETAILS } from "../Actions/ActionTypes";

export var VendorDetialsReducer = (state = initialState.Alldetails, action) => {
    switch (action.type) {
        case DETAILS.GET_ALL_DETAILS:
            console.log(action.payload, "redux update all details")
            
            return state = action.payload;
        default:
            return state;

    }
};