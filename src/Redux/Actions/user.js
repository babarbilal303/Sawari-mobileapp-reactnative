import { USER } from './ActionTypes'
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
export const signUpUser = (email, pasword, name) => {
    return new Promise(function (resolve, reject) {

        Auth().createUserWithEmailAndPassword(email, pasword, name).then((result) => {
            // console.log(result,"create fun")
            resolve(result);
            return result.user.updateProfile({
                displayName: name
            })


        }).catch((err) => {
            console.log("ERROR");
            reject(err)
        })

    })
}

export const submitUserObj = (Id, Name, Email, Cnic, PhoneNuber) => {
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
            PhoneNuber: PhoneNuber

        }


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
