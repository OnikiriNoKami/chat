import userTypes from "./userTypes";

export const setUserData = ({nickName, email}) => ({
    type: userTypes.SET_USER_DATA,
    payload: {nickName, email}
})

export const dropUserData = () => ({
    type: userTypes.DROP_USER_DATA,
})

