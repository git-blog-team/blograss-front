import { IUserInitialState } from '@/types/interfaces/commons';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IUserInitialState = {
    accessToken: '',
    refreshToken: '',
    isLogin: false,
    adminInfo: {
        adminId: '',
        adminName: '',
    },
};

export const userDataSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserData: (state, action) => {
            state = {
                ...state,
                ...action.payload,
            };
            return state;
        },
        initUserData: (state) => {
            state = {
                ...state,
                ...initialState,
            };
            return state;
        },
    },
});

export const { updateUserData, initUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
