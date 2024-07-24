import { z } from "zod";
import { axios } from "utils";
import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export interface CommentData {
  id: number;
  comment: string;
  username?: string;
  profile_picture?: string;
  created_at: string;
  user_id: number;
  time: string;
  subcomment: number;
}

export const commentSchema = z.object({
  id: z.number(),
  comment: z.string(),
  username: z.string().nullish(),
  profile_picture: z.string().nullish(),
  created_at: z.string(),
  user_id: z.number(),
  time: z.string(),
  subcomment: z.number(),
});

export const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(commentSchema),
});

export interface CommentParams {
  id: string;
  type: string;
  app: string;
}

export const getCommentList = async ({
  id,
  type = "article",
  app = "picapital",
}: CommentParams) => {
  const { data } = await axios.get(`/${app}/comment/${id}`, {
    params: { type },
  });
  return schema.parse(data).data;
};

export const useCommentList = (params: CommentParams) =>
  useQuery(["commentList", params], () => getCommentList(params));

useCommentList.prefetch = async (
  queryClient: QueryClient,
  params: CommentParams
) =>
  await queryClient.prefetchQuery(["commentList", params], () =>
    getCommentList(params)
  );
