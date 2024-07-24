import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export interface Root {
  status: string;
  message: string;
  data: PiSpaceArticle;
}

export interface PiSpaceArticle {
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
  packages: PackageItem[];
}

export interface PackageItem {
  id: number;
  name: string;
  content: string;
  price: number;
  status: string;
}

export const packageSchema = z.object({
  id: z.number(),
  name: z.string(),
  content: z.string(),
  price: z.number(),
  status: z.string(),
});

export const piSpaceArticleSchema = z.object({
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
  packages: z.array(packageSchema),
});

export const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: piSpaceArticleSchema,
});

export const getPiSpaceArticle = async (id: string) => {
  const { data } = await axios.get(`/pispace/article/${id}`);
  return schema.parse(data).data;
};

export const usePiSpaceArticle = (id: string) =>
  useQuery(["piSpaceArticle", id], () => getPiSpaceArticle(id));

usePiSpaceArticle.prefetch = async (queryClient: QueryClient, id: string) =>
  await queryClient.prefetchQuery(["piSpaceArticle", id], () =>
    getPiSpaceArticle(id)
  );
