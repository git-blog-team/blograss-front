import { configureStore } from '@reduxjs/toolkit';
import exampleSlice from './exampleSlice';

export const store = configureStore({
    reducer: {
        // slice
        example: exampleSlice,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
