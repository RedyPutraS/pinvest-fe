import { useMutation } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const commentSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({ id: z.number() }),
});

type Params = {
  slug: string;
  app: string;
  type: string;
};

export type PostCommentBody = {
  comment: string;
};

export const postComment = async (
  { app, slug, type }: Params,
  body: PostCommentBody
) => {
  const { data } = await axios.post(`${app}/comment/${slug}`, body, {
    params: { type },
  });
  return commentSchema.parse(data).data;
};

export const usePostComment = (params: Params) =>
  useMutation(["post-comment", params], (body: PostCommentBody) =>
    postComment(params, body)
  );
