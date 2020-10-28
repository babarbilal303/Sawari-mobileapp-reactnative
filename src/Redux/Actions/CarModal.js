import { CARMODAL } from './ActionTypes'
export const setModalToggle = toggle => {
    console.log(toggle, "action redux")
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: CARMODAL.CAR_MODAL_VISIABLE,
                payload: toggle
            });
            resolve();
        });
    };
};