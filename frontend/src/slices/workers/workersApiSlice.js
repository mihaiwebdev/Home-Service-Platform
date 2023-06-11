import { apiSlice } from '../apiSlice'
const WORKERS_URL = '/api/v1/workers'

export const workersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAvailableWorkers: builder.query({
            query: (data) => ({
                url: `${WORKERS_URL}/radius?services[elemMatch][service]=${data.service}&address=${data.address}&date=${data.date}&hour=${data.hour}`,
                method: 'GET',
            })
        })
    })
});

export const { useGetAvailableWorkersQuery } = workersApiSlice;