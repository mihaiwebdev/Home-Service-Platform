import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import serviceReducer from './slices/services/servicesSlice'
import workerReducer from './slices/workers/workersSlice'
import contractReducer from './slices/contracts/contractsSlice'
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        service: serviceReducer,
        worker: workerReducer,
        contracts: contractReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        apiSlice.middleware),
    devTools: true
});

export default store;