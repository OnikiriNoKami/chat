import userTypes from "./userTypes";

const initialState = {
    email: '',
    nickName: '',
}

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case userTypes.SET_USER_DATA:
        return { ...state, email: payload.email, nickName: payload.nickName }

    case userTypes.DROP_USER_DATA:
        return { ...state, email: '', nickName: '' }

    default:
        return state
    }
}

export default userReducer;
