import { z } from "zod";
import { axios } from "utils";
import { useQuery, type QueryClient } from "@tanstack/react-query";

export const newsSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    id: z.number(),
    meta_title: z.any(),
    meta_description: z.string(),
    meta_keyword: z.string(),
    thumbnail_image: z.string(),
    cover_image: z.string(),
    title: z.string(),
    description: z.string(),
    content: z.string(),
    author: z.string().nullable(),
    publish_at: z.string().nullish(),
    province: z.string().nullish(),
    city: z.string().nullish(),
    address: z.string().nullish(),
    google_location: z.string().nullish(),
    place: z.string().nullish(),
    category_name: z.string(),
    subcategory_name: z.string().nullish(),
  }),
});

type Params = {
  slug: string;
};

export const getNewsDetail = async ({ slug }: Params) => {
  const { data } = await axios.get(`/pinews/article/${slug}`);
  return newsSchema.parse(data).data;
};

export const useNewsDetail = (params: Params) =>
  useQuery(["news-detail", params], () => getNewsDetail(params));

useNewsDetail.prefetch = async (queryClient: QueryClient, params: Params) =>
  queryClient.prefetchQuery(["news-detail", params], () =>
    getNewsDetail(params)
  );
