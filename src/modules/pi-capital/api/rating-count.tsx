import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.string(),
});

export interface RatingParams {
  id: string;
  type: string;
  app: string;
}
export const getRatingCount = async ({
  id,
  type = "article",
  app = "picapital",
}: RatingParams) => {
  const { data } = await axios.get(`/rating/count/${id}`, {
    params: { type, app },
  });
  return schema.parse(data).data;
};

export const useRatingCount = (params: RatingParams) =>
  useQuery(["ratingCount", params], () => getRatingCount(params));

useRatingCount.prefetch = async (
  queryClient: QueryClient,
  params: RatingParams
) =>
  await queryClient.prefetchQuery(["ratingCount", params], () =>
    getRatingCount(params)
  );
