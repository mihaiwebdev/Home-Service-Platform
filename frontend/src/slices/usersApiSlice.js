import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/v1/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/updatedetails`,
                method: 'PUT',
                body: data
            })
        }),
        updatePassword: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/updatepassword`,
                method: 'PUT',
                body: data
            })
        }),
        deleteUser: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/deleteme`,
                method: 'DELETE'
            })
        }),
    })
});

export const { useLoginMutation, useLogoutMutation , useUpdatePasswordMutation,
    useRegisterMutation, useUpdateUserMutation, useDeleteUserMutation } = usersApiSlice;