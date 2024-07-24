import { useQuery } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const commentItemSchema = z.object({
  id: z.number(),
  author: z.string(),
  comment: z.string(),
  username: z.string().nullish(),
  profile_picture: z.string().nullish(),
  created_at: z.string(),
  user_id: z.number(),
  time: z.string(),
  subcomment: z.number(),
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
  type: string;
};

export const getCommentList = async ({ type, app, slug }: Params) => {
  const { data } = await axios.get(`${app}/comment/${slug}`, {
    params: { type },
  });
  return commentSchema.parse(data).data;
};

export const useCommentList = (params: Params) =>
  useQuery(["comment-list", params], () => getCommentList(params));

useCommentList.prefetch = async (queryClient: QueryClient, params: Params) =>
  queryClient.prefetchQuery(["comment-list", params], () =>
    getCommentList(params)
  );
