import type { QueryClient } from "@tanstack/react-query";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export interface PiNewsParams {
  page?: number;
  limit?: number;
  category?: string | null;
}

export interface PiNewsArticle {
  id: number;
  thumbnail_image: string;
  title: string;
  description: string;
  author: string;
  category_name: string;
  publish_at?: string | null | undefined;
  subcategory_name?: string | null | undefined;
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
      category_name: z.string(),
      subcategory_name: z.string().nullish(),
    })
  ),
});

export const getPiNews = async ({
  page = 1,
  limit = 10,
  category,
}: PiNewsParams) => {
  const start = (page - 1) * limit;
  const { data } = await axios.get("/pinews/article", {
    params: { limit, start, category },
  });
  return schema.parse(data).data;
};

export const usePiNews = (params: PiNewsParams) =>
  useQuery(["piNews", params], () => getPiNews(params));

usePiNews.prefetch = async (queryClient: QueryClient, params: PiNewsParams) =>
  await queryClient.prefetchQuery(["piNews", params], () => getPiNews(params));

export const useInfinitePiNews = (params: PiNewsParams) =>
  useInfiniteQuery({
    queryKey: ["use-infinite-pi-news", params],
    queryFn: ({ pageParam = 1 }) => getPiNews({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.length === params.limit ? pages.length + 1 : undefined,
  });
