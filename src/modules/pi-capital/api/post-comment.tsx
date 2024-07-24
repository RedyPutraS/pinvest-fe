import { useMutation } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const commentSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({ id: z.number() }),
});

type Params = {
  id: string;
  app: string;
  type: string;
};

type PostCommentBody = {
  comment: string;
};

export const postComment = async (
  { id, app, type }: Params,
  body: PostCommentBody
) => {
  const { data } = await axios.post(`/${app}/comment/${id}?type=${type}`, body);
  return commentSchema.parse(data).data;
};

export const useCommentMutation = (params: Params) =>
  useMutation(["post-comment", params], (body: PostCommentBody) =>
    postComment(params, body)
  );

export default useCommentMutation;
