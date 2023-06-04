import { createSlice } from '@reduxjs/toolkit';

export interface IUserInitialState {
    accessToken?: string;
    refreshToken?: string;
    adminInfo?: {
        adminId: string;
        adminName: string;
    };
}

const initialState: IUserInitialState = {};

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
    },
});

export const { updateUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
