import { checkRequired, checkLength } from './checks';


export const validateTitle = title => {
    let errorMessage = checkRequired('Title', title);
    if (errorMessage) return errorMessage;

    errorMessage = checkLength('Title', title, 3, 40);
    return errorMessage;
}

export const validateComment = comment => {
    let errorMessage = checkRequired('Comment', comment);
    if (errorMessage) return errorMessage;

    errorMessage = checkLength('Comment', comment, 100, 300);
    return errorMessage;
}