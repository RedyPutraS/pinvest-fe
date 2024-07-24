import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      image: z.string(),
      type: z.string(),
      url: z.string(),
    })
  ),
});

type Params = {
  appName: string;
};

export const getAds = async ({ appName }: Params) => {
    const { data } = await axios.get(`/ads/by-app/${appName}`);
  
  return schema.parse(data).data;
};

export const useAds = (params: Params) =>
useQuery(["ads", params], () => getAds(params));

useAds.prefetch = async (queryClient: QueryClient, params: Params) =>
  await queryClient.prefetchQuery(["ads", params], () => getAds(params));
