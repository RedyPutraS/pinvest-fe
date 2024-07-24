import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export interface PiCapitalArticle {
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

export const piCapitalArticleSchema = z.object({
  id: z.number(),
  meta_title: z.string().nullish(),
  meta_description: z.string(),
  meta_keyword: z.string(),
  thumbnail_image: z.string(),
  cover_image: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.string(),
  author: z.string().nullish(),
  publish_at: z.string().nullish(),
  province: z.string().nullish(),
  city: z.string().nullish(),
  address: z.string().nullish(),
  google_location: z.string().nullish(),
  place: z.string().nullish(),
  category_name: z.string(),
  subcategory_name: z.string().nullish(),
});

export const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: piCapitalArticleSchema,
});

export const getPiCapitalArticle = async (id: string) => {
  const { data } = await axios.get(`/picapital/article/${id}`);
  return schema.parse(data).data;
};

export const usePiCapitalArticle = (id: string) =>
  useQuery(["piCapitalArticle", id], () => getPiCapitalArticle(id));

usePiCapitalArticle.prefetch = async (queryClient: QueryClient, id: string) =>
  await queryClient.prefetchQuery(["piCapitalArticle", id], () =>
    getPiCapitalArticle(id)
  );
