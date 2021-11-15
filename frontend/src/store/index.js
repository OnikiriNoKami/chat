import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import userReducer from "./userStore/userReducer";
import authorizationReducer from "./authorizationStore/authorizationReducer";

const combinedReducer = combineReducers({
    authorization: authorizationReducer,
    user: userReducer,
    
});

export const store = createStore(
    combinedReducer,
    composeWithDevTools(applyMiddleware(thunk))
);