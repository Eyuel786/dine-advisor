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

