import { DETAILS } from './ActionTypes'
import { database } from '../../../Setup'
export const getAllDetails = () => {

    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const userRef = database().ref(`users`);
            const onloadingListener = userRef.on('value', (snapshot) => {
                console.log("data get from db", snapshot._snapshot.value)
                dispatch({
                    type: DETAILS.GET_ALL_DETAILS,
                    payload: snapshot._snapshot.value
                });
                resolve(snapshot._snapshot.value);
            });

        });
    };
};
