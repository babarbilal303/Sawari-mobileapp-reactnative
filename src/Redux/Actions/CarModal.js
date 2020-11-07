import { CARMODAL } from './ActionTypes';
import { firebase, Auth, database } from '../../../Setup';

export const setModalToggle = (toggle) => {
  console.log(toggle, 'action redux');
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: CARMODAL.CAR_MODAL_VISIABLE,
        payload: toggle,
      });
      resolve();
    });
  };
};

export const ModalTOggleONADD = () => {

  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: CARMODAL.CAR_MODAL_VISIABLE_ADD_TRUE,

      });
      dispatch({
        type: CARMODAL.CAR_MODAL_VISIABLE_EDIT_FALSE,

      });
      resolve();
    });
  };
};


export const ModalTOggleONEDIT = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: CARMODAL.CAR_MODAL_VISIABLE_EDIT_TRUE,

      });
      dispatch({
        type: CARMODAL.CAR_MODAL_VISIABLE_ADD_FALSE,

      });
      resolve();
    });
  };
};

export const carDetialForEdit = (carObj) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: CARMODAL.CAR_DETAILS_FOR_EDIT,
        payload: carObj,
      });
      resolve();
    });
  };
};

export const submitCarDetails_Cloud = (carDetialObj) => {
  return new Promise(function (resolve, reject) {


    console.log(carDetialObj, 'carDetial database cloud');


    let UserID = carDetialObj.VendorID;
    let key;
    if (carDetialObj.Id != null) {  //for exiting user edit
      key = carDetialObj.Id
    } else {
      key = database().ref().push().key; //for new user add
    }
    let carDetial = {
      ...carDetialObj,
      Id: key
    }

    database()
      //   .ref('users/' + key +"/"+ 'carDetials')
      .ref(`users/${UserID}/carDetials/${key}`)

      .update(carDetial)
      .then((snapshot) => {
        console.log("workig")
        resolve(snapshot);
      })
      .catch((err) => reject(err));
  });
};
