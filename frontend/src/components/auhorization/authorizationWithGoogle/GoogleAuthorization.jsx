import React from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useBoxStyles from '../../../styles/box/boxStyles.js';
import { useHistory } from 'react-router';
import { signInWithPopup } from '@firebase/auth';
import { useDispatch } from 'react-redux';
import { auth, googleAuthProvider } from '../../../firebase/index.js';
import { setUserData } from '../../../store/userStore/userActions';
import { setAuthorized } from '../../../store/authorizationStore/authorizationActions.js';
import { MAIN_PATH } from '../../../utils/consts/routerConsts.js';

export default function GoogleAuthorization() {
    const dispatch = useDispatch();
    const boxStyles = useBoxStyles();
    const history = useHistory();

    const handleLogIn = () => {
        signInWithPopup(auth, googleAuthProvider)
        .then(result=>{
            const user = result.user;
            dispatch(setUserData({nickname: user.displayName, email: user.email}))
            dispatch(setAuthorized(true));
            history.push(MAIN_PATH)
        })
        .catch(error=>{
            console.error(error.message)
        })
    }

    return (
        <Box className={boxStyles.box}>
            <Button onClick={handleLogIn}>Log in with Google</Button>
        </Box>
    )
}
