import { useQuery } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const ratingSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    total: z.number(),
    count: z.number(),
  }),
});

type Params = {
  slug: string;
  app: string;
  type: string;
};

export const getRating = async ({ app, type, slug }: Params) => {
  const { data } = await axios.get(`${app}/rating/count/${slug}`, {
    params: { type },
  });
  return ratingSchema.parse(data).data;
};

export const useRating = (params: Params) =>
  useQuery(["rating", params], () => getRating(params));

useRating.prefetch = async (queryClient: QueryClient, params: Params) =>
  queryClient.prefetchQuery(["rating", params], () => getRating(params));
