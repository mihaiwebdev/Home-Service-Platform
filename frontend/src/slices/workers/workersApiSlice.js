import { apiSlice } from "../apiSlice";
const WORKERS_URL = "/api/v1/workers";
const SCHEDULE_URL = "/api/v1/schedules";

export const workersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableWorkers: builder.query({
      query: (data) => ({
        url: `${WORKERS_URL}/radius?services[elemMatch][service]=${data.service}&address=${data.address}&date=${data.date}&hour=${data.hour}&page=${data.page}`,
        method: "GET",
      }),
    }),
    getWorkerInfo: builder.query({
      query: (id) => ({
        url: `${WORKERS_URL}/${id}`,
        method: "GET",
      }),
    }),
    updateWorkerInfo: builder.mutation({
      query: (data) => ({
        url: `${WORKERS_URL}`,
        method: "PUT",
        body: data,
      }),
    }),
    getWorkerSchedule: builder.query({
      query: () => ({
        url: SCHEDULE_URL,
        method: "GET",
      }),
    }),
    setWorkerSchedule: builder.mutation({
      query: (data) => ({
        url: SCHEDULE_URL,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAvailableWorkersQuery,
  useGetWorkerInfoQuery,
  useUpdateWorkerInfoMutation,
  useGetWorkerScheduleQuery,
  useSetWorkerScheduleMutation,
} = workersApiSlice;
