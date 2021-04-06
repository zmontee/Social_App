import {
    LIKE_SCREAM,
    LOADING_DATA,
    SET_CURRENT_SCREAM,
    SET_SCREAMS,
    UNLIKE_SCREAM
} from "../types";

const initialState = {
    screams: [],
    currentScream: {
        comments: []
    },
    loading: false,
}

export const dataReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            }
        case SET_CURRENT_SCREAM:
            return {
                ...state,
                currentScream: action.payload,
                loading: false
            }
        case LOADING_DATA:
            return {
                ...state,
                loading: action.loading
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex(scream => scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            return {
                ...state
            }
        default:
            return state;
    }
}