// LIKE I DID BEFORE THIS PROJECT

/*
import {screamsAPI} from "../api/api";

const SET_SCREAMS = 'SET_SCREAMS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

const initialState = {
    screams: [],
    isFetching: false,
}

export const screamsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.screams
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    }
}

export const setScreamsAC = screams =>({type: SET_SCREAMS, screams});
export const toggleIsFetchingAC = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export const getScreamsTC = () => async (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    let response = await screamsAPI.getAllScreams();
    dispatch(setScreamsAC(response.data));
    dispatch(toggleIsFetchingAC(false));
}*/
