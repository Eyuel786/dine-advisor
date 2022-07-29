import { checkRequired, checkLength, checkEmail, checkPassword } from './checks'

export const validateUsername = value => {
    let errorMessage = checkRequired('Username', value);
    if (errorMessage) return errorMessage;

    errorMessage = checkLength('Username', value, 3, 30);
    return errorMessage;
}

export const validateEmail = value => {
    let errorMessage = checkRequired('Email', value);
    if (errorMessage) return errorMessage;

    errorMessage = checkEmail(value);
    return errorMessage;
}

export const validatePassword = value => {
    let errorMessage = checkRequired('Password', value);
    if (errorMessage) return errorMessage;

    errorMessage = checkPassword(value);
    return errorMessage;
}

export const validateImage = value => {
    let errorMessage = checkRequired('Image', value);
    return errorMessage;
}

export const validatePassword2 = (password2, password1) => {
    let errorMessage = checkRequired('Password2', password2);
    if (errorMessage) return errorMessage;

    const passwordsMatch = password1.trim() === password2.trim();

    if (!passwordsMatch) return 'Passwords do not match';

    return null;
}