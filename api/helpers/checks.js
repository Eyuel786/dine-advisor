module.exports.checkRequired = (values, requireds) => {
    for (let req of requireds) {
        if (!values[req] || values[req] === '') {
            return `${req} is required`
        }
    }

    return null;
}

module.exports.checkLength = (filedName, value, min, max) => {
    const trimmedValue = value.trim();

    if (trimmedValue.length < min) {
        return `${filedName} must be greater than ${min} characters`;
    } else if (trimmedValue.length > max) {
        return `${filedName} must be less than ${max} characters`;
    } else {
        return null;
    }
}

module.exports.checkEmail = value => {
    const trimmedValue = value.trim();

    const emailIsValid = /[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}/.test(trimmedValue);
    if (!emailIsValid) return 'Email is not valid';

    return null;
}





















