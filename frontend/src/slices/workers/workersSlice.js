import { createSlice } from '@reduxjs/toolkit'

const workersSlice = createSlice({
    name: 'worker',
    initialState: { },
    reducers: {
        setAvailableWorkers: (state, action) => {
            state.availableWorkers = action.payload.data;
        }
    }
});

export const { setAvailableWorkers } = workersSlice.actions;

export default workersSlice.reducer;