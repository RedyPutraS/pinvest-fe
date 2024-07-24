import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export interface PiCircleParams {
  page?: number;
  limit?: number;
  category?: string | null;
}

export interface PiCircleArticle {
  id: number;
  thumbnail_image: string;
  title: string;
  description: string;
  author: string;
  publish_at?: string;
  category_name: string;
  subcategory_name: string;
  province?: string;
  city?: string;
  address?: string;
  rate?: number;
  google_location?: string;
  place?: string;
}

const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      rate: z.number(),
      thumbnail_image: z.string(),
      title: z.string(),
      description: z.string(),
      author: z.string(),
      publish_at: z.string().nullish(),
      category_name: z.string(),
      subcategory_name: z.string(),
      province: z.string().nullish(),
      city: z.string().nullish(),
      address: z.string().nullish(),
      google_location: z.string().nullish(),
      place: z.string().nullish(),
    })
  ),
});

export const getPiCircle = async ({
  page = 1,
  limit = 10,
  category,
}: PiCircleParams) => {
  const start = (page - 1) * limit;
  const { data } = await axios.get("/picircle/article", {
    params: { limit, start, category },
  });
  return schema.parse(data).data;
};

export const usePiCircle = (params: PiCircleParams) =>
  useQuery(["piCircle", params], () => getPiCircle(params));

usePiCircle.prefetch = async (
  queryClient: QueryClient,
  params: PiCircleParams
) =>
  await queryClient.prefetchQuery(["piCircle", params], () =>
    getPiCircle(params)
  );
