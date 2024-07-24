import { useMutation, useQuery } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const commentItemSchema = z.object({
  id: z.number(),
  sub_comment: z.string(),
  profile_picture: z.string(),
  created_at: z.string(),
  reply_name: z.string(),
  reply_id: z.number(),
  refer_name: z.string(),
  refer_id: z.number(),
  action: z.string().nullish(),
  like: z.number(),
  time: z.string(),
});

export type CommentItemType = z.infer<typeof commentItemSchema>;

const commentSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(commentItemSchema),
});

type Params = {
  slug: string;
  app: string;
};

export const getSubcommentList = async ({ app, slug }: Params) => {
  const { data } = await axios.get(`${app}/subcomment/${slug}`);
  return commentSchema.parse(data).data;
};

export const useSubcommentList = (params: Params) =>
  useQuery(["subcomment-list", params], () => getSubcommentList(params));

useSubcommentList.prefetch = async (queryClient: QueryClient, params: Params) =>
  queryClient.prefetchQuery(["subcomment-list", params], () =>
    getSubcommentList(params)
  );

export type PostCommentBody = {
  comment: string;
};

export const postSubcomment = async (
  { app, slug }: Params,
  body: PostCommentBody
) => {
  const { data } = await axios.post(`${app}/subcomment/${slug}`, {
    sub_comment: body.comment,
    sub_comment_id: null,
  });
  return data.data;
};

export const usePostSubcomment = (params: Params) =>
  useMutation(["post-subcomment", params], (body: PostCommentBody) =>
    postSubcomment(params, body)
  );
