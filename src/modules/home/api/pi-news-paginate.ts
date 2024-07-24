import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export interface PiNewsParams {
  page?: string | null;
  limit?: number;
  category?: string | null;
}

export interface PiNewsArticle {
  id: number;
  thumbnail_image: string;
  title: string;
  description: string;
  author: string;
  publish_at?: string;
  category_name: string;
  subcategory_name: string;
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
  page: z.object({
    total_data: z.number(),
    total_page: z.number(),
    current_page: z.number(),
    prev_page_url: z.string().nullish(),
    next_page_url: z.string().nullish(),
    links: z.array(
      z.object({
        url: z.string().nullish(),
        label: z.string(),
        active: z.boolean(),
      })
    ),
  }),
});

export const getPiNews = async ({
  page = "",
  limit = 10,
  category,
}: PiNewsParams) => {
  // const start = (page - 1) * limit;
  const start = 0;
  const { data } = await axios.get("/pinews/article", {
    params: { limit, start, category, page },
  });
  return schema.parse(data);
};

export const usePiCastPaginateArticle = (params: PiNewsParams) =>
  useQuery(["article-paginate", params], () => getPiNews(params));

usePiCastPaginateArticle.prefetch = async (
  queryClient: QueryClient,
  params: PiNewsParams
) =>
  queryClient.prefetchQuery(["article-paginate", params], () =>
    getPiNews(params)
  );
