import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.number(),
});

export interface CommentLikeParams {
  id: number;
  type: string;
  app: string;
}

export const getCommentLike = async ({
  id,
  type = "article",
  app = "picapital",
}: CommentLikeParams) => {
  const { data } = await axios.get(`/comment-like/${id}`, {
    params: { type, app },
  });
  return schema.parse(data).data;
};

export const useCommentLike = (params: CommentLikeParams) =>
  useQuery(["commentLike", params], () => getCommentLike(params));

useCommentLike.prefetch = async (
  queryClient: QueryClient,
  params: CommentLikeParams
) =>
  await queryClient.prefetchQuery(["commentLike", params], () =>
    getCommentLike(params)
  );
