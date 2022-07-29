import { useReducer } from 'react';


function inputReducer(state, action) {

    switch (action.type) {
        case "CHANGE":
            return {
                enteredValue: action.enteredValue,
                inputIsTouched: state.inputIsTouched
            }
        case "BLUR":
            return {
                enteredValue: state.enteredValue,
                inputIsTouched: true
            }
        case "RESET":
            return {
                enteredValue: '',
                inputIsTouched: false
            }
        default:
            return state;
    }
}

export function useInputState(initVal = '', validator, op) {
    const [state, dispatch] = useReducer(inputReducer,
        { enteredValue: initVal, inputIsTouched: false });

    const { enteredValue, inputIsTouched } = state;

    const errorMessage = op ? validator(enteredValue, op.value2)
        : validator(enteredValue);
    const inputIsValid = !errorMessage;
    const inputHasError = inputIsTouched && !inputIsValid;

    const handleChange = e => dispatch({
        type: 'CHANGE',
        enteredValue: e.target.value
    });
    const handleBlur = () => dispatch({ type: 'BLUR' });
    const reset = () => dispatch({ type: 'RESET' });

    return {
        enteredValue,
        inputIsValid,
        errorMessage,
        inputHasError,
        handleChange,
        handleBlur,
        reset
    }
}