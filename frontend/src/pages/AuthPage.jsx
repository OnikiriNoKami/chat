import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth, googleAuthProvider } from '../firebase/index.js';
import { setUserData } from '../store/userStore/userActions';
import { signInWithPopup } from '@firebase/auth';

export default function AuthPage() {
    const dispatch = useDispatch();

    return (
        <div>
            authPage
        </div>
    )
}
