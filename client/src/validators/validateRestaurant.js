import { checkRequired, checkLength } from "./checks"

export const validateName = name => {
    let errorMessage = checkRequired('Name', name);
    if (errorMessage) return errorMessage;

    errorMessage = checkLength('Name', name, 3, 30);
    return errorMessage;
}

export const validateDescription = description => {
    let errorMessage = checkRequired('Description', description);
    if (errorMessage) return errorMessage;

    errorMessage = checkLength('Description', description, 30, 180);
    return errorMessage;
}

export const validateLocation = location => {
    let errorMessage = checkRequired('Location', location);
    if (errorMessage) return errorMessage;
}

export const validateImage = image => {
    let errorMessage = checkRequired('Image', image);
    return errorMessage;
}

export const validateEmail = email => {
    let errorMessage = checkRequired('Email', email);
    if (errorMessage) return errorMessage;

    const emailIsValid = /[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
    if (!emailIsValid) return 'Email is not valid';

    return null;
}