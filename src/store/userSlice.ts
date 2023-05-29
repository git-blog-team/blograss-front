import { createSlice } from '@reduxjs/toolkit';

export interface IUserInitialState {
    userName?: string;
    accessToken?: string;
}

const initialState: IUserInitialState = {
    userName: '',
    accessToken: '',
};

export const userDataSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserData: (state, action) => {
            state.userName = action.payload.userName;
            state.accessToken = action.payload.accessToken;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
