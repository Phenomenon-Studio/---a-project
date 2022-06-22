import { createSlice } from '@reduxjs/toolkit';

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: {
        text: '',
        isError: false,
    },
    reducers: {
        setStateInSnackbar: (state, action) => {
            state.text = action.payload.text;
            state.isError = action.payload.isError;
        },
        clearStateInSnackbar(state) {
            state.text = '';
            state.isError = false;
        },
    },
});

export const { setStateInSnackbar, clearStateInSnackbar } = snackbarSlice.actions;

export const selectSnackbarText = state => state.snackbar.text;
export const selectSnackbarIsError = state => state.snackbar.isError;

export default snackbarSlice.reducer;
