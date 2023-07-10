import { createSlice } from "@reduxjs/toolkit";

const workersSlice = createSlice({
  name: "worker",
  initialState: {},
  reducers: {
    setAvailableWorkers: (state, action) => {
      state.availableWorkers = action.payload.data;
    },
    setWorkerInfo: (state, action) => {
      state.workerInfo = action.payload.data;
    },
    clearWorkerInfo: (state, action) => {
      state.workerInfo = null;
    },
  },
});

export const {
  setAvailableWorkers,
  setWorkerInfo,
  setWorkerAvailability,
  clearWorkerInfo,
} = workersSlice.actions;

export default workersSlice.reducer;
