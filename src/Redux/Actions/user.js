import { USER } from './ActionTypes'
import {submitCarDetails_Cloud} from '../Actions/CarModal'
import { firebase, Auth, database } from "../../../Setup";
export const setUsername = username => {
    console.log(username, "action redux")
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: USER.SET_USERNAME,
                payload: username
            });
            resolve();
        });
    };
};
export const UpdateUserProfile = url => {
    console.log(url, "action redux")
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: USER.UPDATE_USER_PROFILE,
                payload: url
            });
            resolve();
        });
    };
};
export const UpdateCarDetialsInUser = cardetails => {
    console.log(cardetails, "action redux cardetial")
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: USER.UPDATE_USER,
                payload: cardetails
            });
            resolve();
        });
    };
};

export const RemoveCarDetialsInUser = userObj => {
    console.log(userObj, "action redux remove id")
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            database()
                .ref(`users/${userObj.VendorID}/carDetials/${userObj.Id}`)
                .remove()
                .then(() => { console.log("done") })
                .catch((err) => console.log(err, "erroe"));
            dispatch({
                type: USER.REMOVE_CARINDETIALS,
                payload: userObj.Id
            });
            resolve();
        });
    };
};

export const UpdateCarDetialsVendor = cardetails => {
    console.log(cardetails, "action redux UpdateCarDetialsVendor")
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: USER.UPDATE_CAR_DETAILS,
                payload: cardetails
            });
            submitCarDetails_Cloud(cardetails); //set update qurires in a function
            resolve();
        });
    };
};
export const signUpUser = (email, pasword, name, phoneNumber) => {
    return new Promise(function (resolve, reject) {

        Auth().createUserWithEmailAndPassword(email, pasword, name, phoneNumber).then((result) => {
            console.log(phoneNumber, "create fun")
            resolve(result);
            return result.user.updateProfile({
                displayName: name,
                phoneNumber: phoneNumber
            })

        }).catch((err) => {
            console.log("ERROR");
            reject(err)
        })

    })
}

export const submitUserObj = (Id, Name, Email, Cnic, PhoneNuber, Role) => {
    return new Promise(function (resolve, reject) {

        let key;
        if (Id != null) {  //for exiting user edit
            key = Id
        } else {
            key = database().ref().push().key; //for new user add
        }

        let dataToSave = {
            Id: key,
            Name: Name,
            Email: Email,
            Cnic: Cnic,
            PhoneNuber: PhoneNuber,
            Role: Role

        }

        console.log(dataToSave, "signup database userOBJ")

        database().ref('users/' + key).update(dataToSave).then(snapshot => {
            resolve(snapshot);
        }).catch(err => reject(err))
    })
}
export const signInUser = (email, pasword) => {
    return new Promise(function (resolve, reject) {
        console.log("email:", email, "pass:", pasword)

        Auth().signInWithEmailAndPassword(email, pasword).then((data) => {
            resolve(data);
            console.log(data, "use login");
        }).catch((err) => {
            console.log("ERROR");
            reject(err)
        })

    })
}
