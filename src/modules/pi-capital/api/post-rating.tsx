import { useMutation } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const ratingSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({ id: z.number() }),
});

type Params = {
  id: string;
  type: string;
  app: string;
};

type PostRatingBody = {
  rate: number;
  title: string;
  notes: string;
};

export const postRating = async (
  { id, type, app }: Params,
  body: PostRatingBody
) => {
  const { data } = await axios.post(`/rating/${id}`, body, {
    params: { type, app },
  });
  return ratingSchema.parse(data).data;
};

export const useRatingMutation = (params: Params) =>
  useMutation(["post-rating", params], (body: PostRatingBody) =>
    postRating(params, body)
  );
