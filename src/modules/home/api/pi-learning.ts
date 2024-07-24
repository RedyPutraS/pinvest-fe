import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export const ticketSchema = z
  .object({
    title: z.string().nullish(),
    description: z.string().nullish(),
    date: z.any().nullish(),
    duration: z.string().nullish(),
  })
  .nullish();

export const instructorSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  image: z.any(),
});

export const daumSchema = z.object({
  id: z.number(),
  type: z.string(),
  thumbnail_image: z.string(),
  cover_image: z.string(),
  master_category_id: z.number(),
  master_subcategory_id: z.number(),
  category_name: z.string(),
  subcategory_name: z.string(),
  category_name_alias: z.string(),
  subcategory_name_alias: z.string(),
  description: z.string(),
  title: z.string(),
  province: z.any(),
  city: z.any(),
  google_location: z.any(),
  place: z.any(),
  address: z.any(),
  view: z.number(),
  price: z.number(),
  promo_price: z.number(),
  app_name: z.string(),
  rate: z.number(),
  ticket: ticketSchema,
  instructor: z.array(instructorSchema).nullish(),
  added_to_wishlist: z.boolean().nullish(),
});

export const rootSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(daumSchema),
});

export interface PiLearningParams {
  page?: number;
  limit?: number;
  category?: string | null;
}

export const getPiLearning = async ({
  page = 1,
  limit = 10,
  category,
}: PiLearningParams) => {
  const start = (page - 1) * limit;
  const { data } = await axios.get("/pilearning/event", {
    params: { limit, start, category },
  });
  return rootSchema.parse(data).data;
};

export const usePiLearning = (params: PiLearningParams) =>
  useQuery(["piLearning", params], () => getPiLearning(params));

usePiLearning.prefetch = async (
  queryClient: QueryClient,
  params: PiLearningParams
) =>
  await queryClient.prefetchQuery(["piLearning", params], () =>
    getPiLearning(params)
  );
