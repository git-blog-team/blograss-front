import { createSlice } from '@reduxjs/toolkit';

export interface IUserInitialState {
    accessToken?: string;
    refreshToken?: string;
    isLogin?: boolean;
    adminInfo?: {
        adminId: string;
        adminName: string;
    };
}

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
            console.log(action.payload);
            state = {
                ...state,
                ...action.payload,
            };
            return state;
        },
    },
});

export const { updateUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
