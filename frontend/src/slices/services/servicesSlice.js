import { createSlice } from '@reduxjs/toolkit'

const servicesSlice = createSlice({
    name: 'service',
    initialState: { },
    reducers: {
        setServices: (state, action) => {
            state.services = action.payload.data;
        }
    }
});

export const { setServices } = servicesSlice.actions;

export default servicesSlice.reducer;