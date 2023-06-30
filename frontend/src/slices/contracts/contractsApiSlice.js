import { apiSlice } from "../apiSlice";
const CONTRACTS_URL = "/api/v1/contracts";

export const contractsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createContract: builder.mutation({
      query: (data) => ({
        url: CONTRACTS_URL,
        method: "POST",
        body: data,
      }),
    }),
    getContracts: builder.query({
      query: (page) => ({
        url: `${CONTRACTS_URL}?page=${page}`,
        method: "GET",
      }),
    }),
    closeContract: builder.mutation({
      query: (contractId) => ({
        url: `${CONTRACTS_URL}/${contractId}`,
        method: "PUT",
        body: { isCompleted: true },
      }),
    }),
  }),
});

export const {
  useCreateContractMutation,
  useGetContractsQuery,
  useCloseContractMutation,
} = contractsApiSlice;
