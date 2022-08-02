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
            const { username, email, image, password } = userData;

            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('image', image);
            formData.append('password', password);

            const response = await fetch('http://localhost:9000/register', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Error sending sign up request');

            const responseData = await response.json();
            dispatch(authActions.login({ auth: responseData }));
            localStorage.setItem('dine-advisor-user', JSON.stringify(responseData));

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
            localStorage.setItem('dine-advisor-user', JSON.stringify(responseData));

        } catch (err) {
            console.log('Error:', err.message);
        }
    }
}

export const logoutRequest = () => {
    return dispatch => {
        try {
            dispatch(authActions.logout());
            localStorage.removeItem('dine-advisor-user');
        } catch (err) {
            console.log('Error:', err.message);
        }
    }
}