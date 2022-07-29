export const checkRequired = (fieldName, value) => {
    if (value.trim() === '')
        return `${fieldName} is required`;

    return null;
}

export const checkLength = (fieldName, value, min, max) => {
    const trimmedValue = value.trim();

    if (trimmedValue.length < min) {
        return `${fieldName} must be greater than ${min} characters`
    } else if (trimmedValue.length > max) {
        return `${fieldName} must be less than ${max} characters`
    } else {
        return null;
    }
}

export const checkEmail = value => {
    const trimmedValue = value.trim();

    const emailIsValid = /[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}/.test(trimmedValue);
    if (!emailIsValid) return 'Email is not valid';

    return null;
}

export const checkPassword = value => {
    const trimmedValue = value.trim();

    const passwordIsValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(trimmedValue);

    if (!passwordIsValid) return 'Password is not valid';

    return null;
}