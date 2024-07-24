import { z } from "zod";
import type { RatingParams } from "./rating-count";
import { axios } from "utils";
import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export interface Rating {
  id: number;
  author: string;
  profile_picture?: string;
  rate: number;
  title: string;
  notes: string;
  created_at: string;
  time: string;
}
export const ratingSchema = z.object({
  id: z.number(),
  author: z.string(),
  profile_picture: z.string().nullish(),
  rate: z.number(),
  title: z.string(),
  notes: z.string(),
  created_at: z.string(),
  time: z.string(),
});

export const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(ratingSchema),
});

export const getRatingList = async ({
  id,
  type = "article",
  app = "picapital",
}: RatingParams) => {
  const { data } = await axios.get(`/rating/${id}`, {
    params: { type, app },
  });
  
  return schema.parse(data).data;
};

export const useRatingList = (params: RatingParams) =>
  useQuery(["ratingList", params], () => getRatingList(params));

useRatingList.prefetch = async (
  queryClient: QueryClient,
  params: RatingParams
) =>
  await queryClient.prefetchQuery(["ratingList", params], () =>
    getRatingList(params)
  );
