import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export interface PiSpaceParams {
  page?: number;
  limit?: number;
}

export interface PiSpaceArticle {
  id: number;
  thumbnail_image: string;
  title: string;
  description: string;
  author: string;
  publish_at?: string;
}

const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      thumbnail_image: z.string(),
      title: z.string(),
      description: z.string(),
      author: z.string(),
      publish_at: z.string().nullish(),
    })
  ),
});

export const getPiSpace = async ({ page = 1, limit = 10 }: PiSpaceParams) => {
  const start = (page - 1) * limit;
  const { data } = await axios.get("/pispace/article", {
    params: { limit, start },
  });
  return schema.parse(data).data;
};

export const usePiSpace = (params: PiSpaceParams) =>
  useQuery(["piSpace", params], () => getPiSpace(params));

usePiSpace.prefetch = async (queryClient: QueryClient, params: PiSpaceParams) =>
  await queryClient.prefetchQuery(["piSpace", params], () =>
    getPiSpace(params)
  );
