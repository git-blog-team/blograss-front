import { IToastInitialState } from '@/types/interfaces/commons';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IToastInitialState = {
    toastMessage: '',
};

export const storeToast = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast: (state, action) => {
            state = {
                ...state,
                ...action.payload,
            };

            return state;
        },
    },
});

export const { showToast } = storeToast.actions;

export default storeToast.reducer;
