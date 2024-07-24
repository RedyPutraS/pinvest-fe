import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(z.any()).nullish(),
});

type Params = {
  search: string;
};

export const getSearch = async (params: Params) => {
  const { data } = await axios.get(`/search`, { params: params });
  return schema.parse(data).data;
};

export const useSearch = (params: Params) =>
  useQuery(["event", params], () => getSearch(params), {
    enabled: false,
  });

useSearch.prefetch = async (queryClient: QueryClient, params: Params) =>
  queryClient.prefetchQuery(["search", params], () => getSearch(params));
