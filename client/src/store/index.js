import { configureStore } from '@reduxjs/toolkit';
import { restaurantsSlice, restaurantsActions } from './restaurantsSlice';


export const store = configureStore({
    reducer: restaurantsSlice.reducer
});

export { restaurantsActions };