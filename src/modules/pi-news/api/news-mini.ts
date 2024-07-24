import { z } from "zod";
import { axios } from "utils";
import { useQuery, type QueryClient } from "@tanstack/react-query";

export const newsSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      thumbnail_image: z.string(),
      title: z.string(),
      description: z.string(),
      author: z.string(),
      publish_at: z.string().optional().nullable(),
      category_name: z.string(),
      subcategory_name: z.string(),
    })
  ),
});

type Params = {
  start: number;
  limit: number;
  sortBy?: string;
};

export const getNews = async ({ start, limit, sortBy }: Params) => {
  const { data } = await axios.get("/pinews/article", {
    params: { start, limit, filter: sortBy },
  });
  return newsSchema.parse(data).data;
};

export const useNews = (params: Params) =>
  useQuery(["news", params], () => getNews(params));

useNews.prefetch = async (queryClient: QueryClient, params: Params) =>
  queryClient.prefetchQuery(["news", params], () => getNews(params));
