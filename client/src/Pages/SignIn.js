import React from 'react';
import { useDispatch } from 'react-redux';

import UserForm from '../shared/UserForm';
import { sendSignInRequest } from '../store';

function SignIn() {
    const dispatch = useDispatch();

    const login = userData => dispatch(sendSignInRequest(userData));

    return <UserForm login={login} isLoggingIn />
}

export default SignIn;