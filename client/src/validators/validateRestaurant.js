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

export const validateCity = city => {
    let errorMessage = checkRequired('City', city);
    if (errorMessage) return errorMessage;

    errorMessage = checkLength('City', city, 3, 30);
    return errorMessage;
}

export const validateState = state => {
    let errorMessage = checkRequired('State', state);
    if (errorMessage) return errorMessage;

    errorMessage = checkLength('State', state, 3, 30);
    return errorMessage;
}

export const validateCountry = country => {
    let errorMessage = checkRequired('Country', country);
    if (errorMessage) return errorMessage;

    errorMessage = checkLength('Country', country, 3, 30);
    return errorMessage;
}

export const validateImage = image => {
    let errorMessage = checkRequired('Image', image);
    return errorMessage;
}

export const validateTel = tel => {
    let errorMessage = checkRequired('Telephone', tel);
    if (errorMessage) return errorMessage;

    errorMessage = checkLength('Telephone', tel, 10, 15);
    return errorMessage;
}

export const validateEmail = email => {
    let errorMessage = checkRequired('Email', email);
    if (errorMessage) return errorMessage;

    const emailIsValid = /[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
    if (!emailIsValid) return 'Email is not valid';

    return null;
}