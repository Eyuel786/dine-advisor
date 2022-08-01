import { useReducer } from 'react';

function imgReducer(state, action) {

    switch (action.type) {
        case 'CHANGE': {
            const pickedImg = action.event.target.files[0];
            if (pickedImg) {
                return {
                    imgFile: pickedImg,
                    imgPreviewUrl: URL.createObjectURL(pickedImg),
                    imgIsValid: true
                }
            } else {
                return state;
            }
        }
        case 'RESET':
            return {
                imgFile: null,
                imgPreviewUrl: null,
                imgIsValid: false
            }
        default:
            return state;
    }
}

export function useImgState(imgPreviewUrl = null, imgIsValid = false) {
    const [imgState, imgDispatch] = useReducer(imgReducer, {
        imgFile: null, imgPreviewUrl, imgIsValid
    });

    const handleImgChange = event => imgDispatch({ type: 'CHANGE', event });
    const resetImg = () => imgDispatch({ type: 'RESET' });

    return [imgState, handleImgChange, resetImg];
}