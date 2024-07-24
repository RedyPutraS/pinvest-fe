import { axios } from "utils";
import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      sub_comment: z.string(),
      profile_picture: z.string(),
      created_at: z.string(),
      reply_name: z.string(),
      reply_id: z.number(),
      refer_name: z.string(),
      refer_id: z.number(),
      action: z.string(),
      like: z.number(),
      time: z.string(),
    })
  ),
});

export interface CommentParams {
  id: string;
  app: string;
}

export const getSubCommentList = async ({ id, app }: CommentParams) => {
  const { data } = await axios.get(`/subcomment/${id}`, {
    params: { app },
  });
  return schema.parse(data).data;
};

export const useSubCommentList = (params: CommentParams) =>
  useQuery(["subcommentList", params], () => getSubCommentList(params));

useSubCommentList.prefetch = async (
  queryClient: QueryClient,
  params: CommentParams
) =>
  await queryClient.prefetchQuery(["subcommentList", params], () =>
    getSubCommentList(params)
  );
