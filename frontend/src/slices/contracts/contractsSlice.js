import { createSlice } from '@reduxjs/toolkit'

const contractsSlice = createSlice({
    name: 'contracts',
    initialState: { },
    reducers: {
        setJobInfo: (state, action) => {
            state.jobInfo = action.payload
        },
        setContracts: (state, action) => {
            state.availableContracts = action.payload.data
        }
    }
});

export const { setJobInfo, setContracts } = contractsSlice.actions;

export default contractsSlice.reducer;