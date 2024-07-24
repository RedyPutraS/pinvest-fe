import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export interface PiCircleArticle {
  id: number;
  meta_title?: string;
  meta_description: string;
  meta_keyword: string;
  thumbnail_image: string;
  cover_image: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publish_at?: string;
  province?: string;
  city?: string;
  address?: string;
  google_location?: string;
  place?: string;
  category_name: string;
  subcategory_name?: string;
}

export const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    id: z.number(),
    meta_title: z.string().optional().nullish(),
    meta_description: z.string().optional().nullish(),
    meta_keyword: z.string().optional().nullish(),
    thumbnail_image: z.string(),
    cover_image: z.string(),
    title: z.string().optional().nullish(),
    description: z.string().optional().nullish(),
    content: z.string().optional().nullish(),
    author: z.string().optional().nullish(),
    publish_at: z.string().optional().nullish(),
    province: z.string().optional().nullish(),
    city: z.string().optional().nullish(),
    address: z.string().optional().nullish(),
    google_location: z.string().optional().nullish(),
    place: z.string().optional().nullish(),
    category_name: z.string().optional().nullish(),
    subcategory_name: z.string().optional().nullish(),
    view: z.number().optional().nullish(),
  }),
});

export const getPiCircleArticleDetail = async (id: string) => {
  const { data } = await axios.get(`/picircle/article/${id}`);
  return schema.parse(data).data;
};

export const usePiCircleArticleDetail = (id: string) =>
  useQuery(["piCircleArticleDetail", id], () => getPiCircleArticleDetail(id));

usePiCircleArticleDetail.prefetch = async (
  queryClient: QueryClient,
  id: string
) =>
  await queryClient.prefetchQuery(["piCircleArticleDetail", id], () =>
    getPiCircleArticleDetail(id)
  );
