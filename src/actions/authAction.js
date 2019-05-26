import axios from 'axios';
import { GET_ERROR, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Register user
export const registerUser = (userData, history) => dispatch => {
    // console.log(userData);
    // return {
    //     type : TEST_DISPATCH,
    //     payload: userData
    // }
    axios.post('http://localhost:3000/api/users/register', userData)
        .then(res => {
            history.push('/login');
        })
        .catch(err => {
            dispatch(triggerErrorAction(err));
        });
};

export const loginUser = (userData) => dispatch => {
    axios.post('http://localhost:3000/api/users/register', userData)
        .then(res => {
            // save to local storage
            const token = res.data.token;
            // set token to local storage
            localStorage.setItem('jwtToken', token);
            // set token to auth header
            setAuthToken(token);
            const decoded = jwt_decode(token);
            // set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch(triggerErrorAction(err));
        });
}

export const triggerErrorAction = (err) => {
    return {
        type : GET_ERROR,
        payload: err.response.data
    }
}

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}
