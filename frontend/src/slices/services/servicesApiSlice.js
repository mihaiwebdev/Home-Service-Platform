import { apiSlice } from '../apiSlice';
const SERVICES_URL = '/api/v1/services'

export const servicesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getServices: builder.query({
            query: () => ({
                url: SERVICES_URL,
                method: 'GET'
            })
        })
    })
});

export const { useGetServicesQuery } = servicesApiSlice;