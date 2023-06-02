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
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
