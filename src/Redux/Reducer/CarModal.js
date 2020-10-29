import initialState from "./intialState";
import { CARMODAL } from "../Actions/ActionTypes";

export var CarModalReducer = (state = initialState.CarModalVisiable, action) => {
    switch (action.type) {
        case CARMODAL.CAR_MODAL_VISIABLE:
            console.log(action.payload, "redux update CarMODEL")
            return state = action.payload;
        default:
            return state;

    }
};
