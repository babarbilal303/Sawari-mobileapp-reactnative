import {CARMODAL} from './ActionTypes';
import {firebase, Auth, database} from '../../../Setup';

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
export const submitCarDetails_Cloud = (carDetialObj) => {
  return new Promise(function (resolve, reject) {


    console.log(carDetialObj, 'carDetial database cloud');

    let key;
    key = carDetialObj.Id;

    database()
      //   .ref('users/' + key +"/"+ 'carDetials')
      .ref(`users/${key}/carDetials/`)

      .push(carDetialObj)
      .then((snapshot) => {
        resolve(snapshot);
      })
      .catch((err) => reject(err));
  });
};
