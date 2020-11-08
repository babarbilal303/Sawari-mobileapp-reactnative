import initialState from "./intialState";
import { USER } from "../Actions/ActionTypes";

export var userReducer = (state = initialState.user, action) => {
    switch (action.type) {
        case USER.SET_USERNAME:
            console.log(action.payload, "redux update")
            return state = action.payload;

        case USER.SET_ROLE:
            console.log(action.payload, "redux update Role")
            return {
                ...state,
                role: action.payload
            }
        case USER.UPDATE_USER:
            console.log(action.payload, "update CAR IN USER")
            console.log(state, "state user Reducer")
            let user = { ...state };
            user = {
                ...user,
                carDetials: action.payload
            }
            return user

        case USER.UPDATE_USER_PROFILE:
            console.log(action.payload, "update user profile action payload")
            console.log(state, "state user Reducer")
            let user1 = { ...state };
            user1 = {
                ...user1,
                profile_url: action.payload
            }
            return user1

        case USER.REMOVE_CARINDETIALS:
            console.log(action.payload, "Remove Car reducer")
            console.log(state, "state user Reducer")
            return {
                ...state,
                carDetials: state.carDetials.filter(el => el.ID !== action.payload)
            }
        case USER.UPDATE_CAR_DETAILS:
            console.log(action.payload, "update reducer payload")
            console.log(state, "state user Reducer")
            let carDetials = state.carDetials
            let carDetialIndex = carDetials
                .map(item => {
                    return item.Id;
                })
                .indexOf(action.payload.Id);
            carDetials[carDetialIndex] = action.payload;
            console.log(carDetials, "car detial reducer")
            return {
                ...state,
                carDetials: [...carDetials],
                // carDetials
            }

        default:
            return state;
    }
};
