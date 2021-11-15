import authorizationTypes from "./authorizationTypes";
const initialState = {
    authorized: false,
}

const authorizationReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case authorizationTypes.SET_AUTHORIZED:
        return { ...state, authorized: payload }

    default:
        return state
    }
}

export default authorizationReducer;