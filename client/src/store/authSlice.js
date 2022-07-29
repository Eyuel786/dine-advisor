import { createSlice } from '@reduxjs/toolkit';

const initialAuth = {
    userId: null,
    username: null,
    email: null,
    image: null,
    token: null,
    tokenExpirationDate: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth: initialAuth
    },
    reducers: {
        login: (state, action) => {
            state.auth = { ...action.payload.auth };
        },
        logout: (state, action) => {
            state.auth = initialAuth
        }
    }
});

export const authActions = authSlice.actions;

export const sendSignUpRequest = userData => {
    return async dispatch => {
        try {
            const response = await fetch('http://localhost:9000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) throw new Error('Error sending sign up request');

            const responseData = await response.json();
            dispatch(authActions.login({ auth: responseData }));

        } catch (err) {
            console.log('Error:', err.message);
        }
    }
}

export const sendSignInRequest = userData => {
    return async dispatch => {
        try {
            const response = await fetch('http://localhost:9000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) throw new Error('Error sending login request');

            const responseData = await response.json();
            dispatch(authActions.login({ auth: responseData }));

        } catch (err) {
            console.log('Error:', err.message);
        }
    }
}

export const logoutRequest = () => {
    return dispatch => {
        dispatch(authActions.logout());
    }
}