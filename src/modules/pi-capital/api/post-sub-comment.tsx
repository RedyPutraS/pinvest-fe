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
};

type PostCommentBody = {
  sub_comment: string;
};

export const postSubComment = async (
  { id, app }: Params,
  body: PostCommentBody
) => {
  const { data } = await axios.post(`/subcomment/${id}?app=${app}`, body);
  return commentSchema.parse(data).data;
};

export const usePostSubComment = (params: Params) =>
  useMutation(["post-comment", params], (body: PostCommentBody) =>
    postSubComment(params, body)
  );
