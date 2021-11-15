import authorizationTypes from "./authorizationTypes";

export const setAuthorized = (authorized) => ({type: authorizationTypes.SET_AUTHORIZED, payload: authorized});
