import axios from "axios";
import {
    CLEAR_ERRORS,
    LOADING_UI,
    LOADING_USER, MARK_NOTIFICATIONS_READ,
    SET_ERRORS,
    SET_UNAUTHENTICATED,
    SET_USER
} from "../types";
import {userAPI} from "../../api/api";

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData)
        .then(res => {
            setAuthorizationData(res.data.token);
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS});
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/signup', newUserData)
        .then(res => {
            setAuthorizationData(res.data.token);
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS});
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.get(`/user`)
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
}

export const setAuthorizationData = token => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}

export const uploadImage = (file) => (dispatch) => {
    dispatch({type: LOADING_USER});
    userAPI.savePhoto(file)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => {
            console.log(err);
        })
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({type: LOADING_USER});
    userAPI.editUserDetails(userDetails)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => {
            console.log(err);
        })
}

export const markNotificationsRead = (notificationIds) => (dispatch) => {
    userAPI.markNotificationsRead(notificationIds)
        .then(() => {
            dispatch({
                type: MARK_NOTIFICATIONS_READ
            })
        })
        .catch(err => console.log(err))
}