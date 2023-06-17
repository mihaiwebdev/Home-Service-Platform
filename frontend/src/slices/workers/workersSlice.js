import { createSlice } from '@reduxjs/toolkit'

const workersSlice = createSlice({
    name: 'worker',
    initialState: { },
    reducers: {
        setAvailableWorkers: (state, action) => {
            state.availableWorkers = action.payload.data;
        },
        setWorkerInfo: (state, action) => {
            state.workerInfo = action.payload.data;
        },
    }
});

export const { setAvailableWorkers, setWorkerInfo } = workersSlice.actions;

export default workersSlice.reducer;