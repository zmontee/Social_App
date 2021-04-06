import {dataAPI, userAPI} from "../../api/api";
import {
    CLEAR_ERRORS,
    LIKE_SCREAM,
    LOADING_DATA,
    LOADING_UI, SET_CURRENT_SCREAM,
    SET_ERRORS,
    SET_SCREAMS,
    UNLIKE_SCREAM
} from "../types";
import axios from "axios";

export const getScreams = () =>  (dispatch) => {
    dispatch({ type: LOADING_UI});
    dataAPI.getAllScreams()
        .then(res => {
            dispatch({type: SET_SCREAMS, payload: res.data});
            dispatch({type: CLEAR_ERRORS});
        })
}

export const likeScream = (screamId) => (dispatch) => {
    dataAPI.like(screamId)
        .then(res => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const unlikeScream = (screamId) => (dispatch) => {
    dataAPI.unlike(screamId)
        .then(res => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const deleteScream = (screamId) => (dispatch) => {
    axios.delete(`/scream/${screamId}`)
        .then(() => {
            dispatch(getScreams());
        })
        .catch(err => {
            console.log(err);
        })
}

export const postNewScream = (body) => (dispatch) => {
    dispatch({type: LOADING_UI});
    dataAPI.postNewScream(body)
        .then(() => {
            dispatch(getScreams());
            dispatch({type: CLEAR_ERRORS});
        })
        .catch(err => {
            dispatch({type: SET_ERRORS, payload: err.response.data});
        })
}

export const getScreamDetails = (screamId) => (dispatch) => {
    dispatch({type: LOADING_DATA, loading: true});
    dataAPI.getScream(screamId)
        .then(res => {
            dispatch({
                type: SET_CURRENT_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const commentOnScream = (screamId, body) => (dispatch) => {
    dataAPI.commentOnScream(screamId, body)
        .then(() => {
            dispatch(getScreamDetails(screamId));
            dispatch({type: CLEAR_ERRORS});
        })
        .catch(err => {
            dispatch({type: SET_ERRORS, payload: err.response.data});
        })
}

export const getUserData = (userHandle) => (dispatch) => {
    dispatch({type: LOADING_UI});
    userAPI.getUserData(userHandle)
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data.screams
            })
            dispatch({type: CLEAR_ERRORS})
        })
        .catch(err => {
            dispatch({
                type: SET_SCREAMS,
                payload: null
            })
        })
}