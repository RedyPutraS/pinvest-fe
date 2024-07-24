import { useQuery } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const articlesSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      thumbnail_image: z.string(),
      title: z.string(),
      description: z.string(),
      category_name: z.string(),
      subcategory_name: z.string().nullish(),
      rate: z.number(),
      author: z.string(),
      publish_at: z.string().nullish(),
    })
  ),
});

type Params = {
  page: number;
  filter: string | null;
  search: string | null;
  category: string | null;
  limit?: number;
};

export const getArticles = async ({
  page = 1,
  filter = "new",
  search = "",
  category = "",
  limit = 50,
}: Params) => {
  const start = (page - 1) * limit;
  const { data } = await axios.get("/pilearning/article", {
    params: { limit, start, filter, search, category },
  });
  return articlesSchema.parse(data).data;
};

export const useArticles = (params: Params) =>
  useQuery(["articles", params], () => getArticles(params));

useArticles.prefetch = async (queryClient: QueryClient, params: Params) =>
  queryClient.prefetchQuery(["articles", params], () => getArticles(params));

const articleDetailSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    id: z.number(),
    meta_title: z.string().nullish(),
    meta_description: z.string(),
    meta_keyword: z.string(),
    thumbnail_image: z.string(),
    cover_image: z.string(),
    title: z.string(),
    description: z.string(),
    content: z.string(),
    category_name: z.string(),
    subcategory_name: z.string(),
    author: z.string().nullish(),
    publish_at: z.string().nullish(),
    province: z.string().nullish(),
    city: z.string().nullish(),
    address: z.string().nullish(),
    google_location: z.string().nullish(),
    place: z.string().nullish(),
  }),
});

type ParamsDetail = {
  slug: string;
};

export const getArticleDetail = async ({ slug }: ParamsDetail) => {
  const { data } = await axios.get(`/pilearning/article/${slug}`);
  return articleDetailSchema.parse(data).data;
};

export const useArticleDetail = (params: ParamsDetail) =>
  useQuery(["article-detail", params], () => getArticleDetail(params));

useArticleDetail.prefetch = async (
  queryClient: QueryClient,
  params: ParamsDetail
) =>
  queryClient.prefetchQuery(["article-detail", params], () =>
    getArticleDetail(params)
  );
