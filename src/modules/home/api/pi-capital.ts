import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export interface PiCapitalParams {
  page?: number;
  limit?: number;
  category?: string | null;
}

export interface PiCapitalArticle {
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
});

export const getPiCapital = async ({
  page = 1,
  limit = 10,
  category,
}: PiCapitalParams) => {
  const start = (page - 1) * limit;
  const { data } = await axios.get("/picapital/article", {
    params: { limit, start, category },
  });
  return schema.parse(data).data;
};

export const usePiCapital = (params: PiCapitalParams) =>
  useQuery(["piCapital", params], () => getPiCapital(params));

usePiCapital.prefetch = async (
  queryClient: QueryClient,
  params: PiCapitalParams
) =>
  await queryClient.prefetchQuery(["piCapital", params], () =>
    getPiCapital(params)
  );
