import { useMutation } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const ratingSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({ id: z.number() }),
});

type Params = {
  slug: string;
  type: string;
  app: string;
};

export type PostRatingBody = {
  rate: number;
  title: string;
  notes: string;
};

export const postRating = async (
  { slug, app, type }: Params,
  body: PostRatingBody
) => {
  const { data } = await axios.post(`${app}/rating/${slug}`, body, {
    params: { type },
  });
  return ratingSchema.parse(data).data;
};

export const usePostRating = (params: Params) =>
  useMutation(["post-rating", params], (body: PostRatingBody) =>
    postRating(params, body)
  );
