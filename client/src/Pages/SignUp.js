import React from 'react';
import { useDispatch } from 'react-redux';

import UserForm from '../shared/UserForm';
import { sendSignUpRequest } from '../store';


function SignUp() {
    const dispatch = useDispatch();

    const register = userData => dispatch(sendSignUpRequest(userData));

    return <UserForm register={register} />
}

export default SignUp;