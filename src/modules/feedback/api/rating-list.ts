import { useQuery } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const ratingItemSchema = z.object({
  id: z.number(),
  author: z.string(),
  rate: z.number(),
  title: z.string(),
  notes: z.string(),
  created_at: z.string(),
});

export type RatingItem = z.infer<typeof ratingItemSchema>;

const ratingSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(ratingItemSchema),
});

type Params = {
  slug: string;
  type: string;
  app: string;
};

export const getRatingList = async ({ slug, app, type }: Params) => {
  const { data } = await axios.get(`${app}/rating/${slug}`, {
    params: { type },
  });
  return ratingSchema.parse(data).data;
};

export const useRatingList = (params: Params) =>
  useQuery(["rating-list", params], () => getRatingList(params));

useRatingList.prefetch = async (queryClient: QueryClient, params: Params) =>
  queryClient.prefetchQuery(["rating-list", params], () =>
    getRatingList(params)
  );
