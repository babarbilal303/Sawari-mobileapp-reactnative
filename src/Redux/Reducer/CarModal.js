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
export var CarModalVisiableAdd = (state = initialState.carMoadlVisiable_ADD, action) => {
    switch (action.type) {

        case CARMODAL.CAR_MODAL_VISIABLE_ADD_TRUE:

            return state = true;
        case CARMODAL.CAR_MODAL_VISIABLE_ADD_FALSE:

            return state = false;

        default:
            return state;

    }
};
export var CarModalVisiableEdit = (state = initialState.carMoadlVisiable_EDIT, action) => {
    switch (action.type) {

        case CARMODAL.CAR_MODAL_VISIABLE_EDIT_FALSE:

            return state = false;
        case CARMODAL.CAR_MODAL_VISIABLE_EDIT_TRUE:

            return state = true;

        default:
            return state;

    }
};
export var CarDetailsForEdit = (state = initialState.CarDetailsForEdit, action) => {
    switch (action.type) {

        case CARMODAL.CAR_DETAILS_FOR_EDIT:
            console.log("carObjReducer", action.payload);
            return action.payload;


        default:
            return state;

    }
};
