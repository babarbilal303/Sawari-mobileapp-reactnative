import React from 'react'
import { View, Text } from 'react-native'
import { firebase, Auth, database } from "../../Setup";
export const signUpUser = (email, pasword, name, cnic) => {
    return new Promise(function (resolve, reject) {
        console.log("email:", email, "pass:", pasword, "name", name, "cnic", cnic)

        Auth().createUserWithEmailAndPassword(email, pasword, name, cnic).then((result) => {
            resolve("sign up succesfully");
            return result.user.updateProfile({
                displayName: name
            })


        }).catch((err) => {
            console.log("ERROR");
            reject(err)
        })

    })
}
export const submitUserObj = (Id, Name, Email, Cnic) => {
    return new Promise(function (resolve, reject) {
        console.log("Id", Id, "Name:", Name, "Email", Email, "Cnic:", Cnic)

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
            Cnic: Cnic

        }

        console.log("update key", key, "onk", dataToSave)

        database().ref('users/' + key).update(dataToSave).then(snapshot => {
            resolve(snapshot);
        }).catch(err => reject(err))
    })
}
export const signInUser = (email, pasword) => {
    return new Promise(function (resolve, reject) {
        console.log("email:", email, "pass:", pasword)

        Auth().signInWithEmailAndPassword(email, pasword).then(() => {
            resolve("sign in succesfully")
        }).catch((err) => {
            console.log("ERROR");
            reject(err)
        })

    })
}
