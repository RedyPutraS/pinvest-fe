import type { QueryClient } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";

export interface OnlineCourseItem {
  type: string;
  detail_event_id: number;
  thumbnail_image: string;
  cover_image: string;
  master_category_id: number;
  master_subcategory_id: number;
  category_name: string;
  subcategory_name: string;
  category_name_alias: string;
  subcategory_name_alias: string;
  description: string;
  price: number;
  event_id: number;
  title: string;
  ticket_pass: boolean;
  province?: string;
  date: string;
  start_time: string;
  end_time: string;
  end_date: string;
  city?: string;
  google_location?: string;
  place?: string;
  address?: string;
  promo_price: number;
  app_name: string;
  rate: number;
  product: Product;
  instructor: Instructor;
}

export interface Product {
  date: string[];
  duration: string;
}

export interface Instructor {
  id: number;
  name: string;
  title?: string;
  description?: string;
}

export const instructorSchema = z.object({
  id: z.number(),
  name: z.string(),
  title: z.string().nullish(),
  image: z.string().nullish(),
  description: z.string().nullish(),
});
export const productSchema = z.object({
  date: z.array(z.string()),
  duration: z.string(),
});
export const onlineCourseItemSchema = z.object({
  id: z.number(),
  type: z.string(),
  detail_event_id: z.number().nullish(),
  thumbnail_image: z.string().nullish(),
  cover_image: z.string(),
  master_category_id: z.number().nullish(),
  master_subcategory_id: z.number().nullish(),
  category_name: z.string().nullish(),
  subcategory_name: z.string().nullish(),
  category_name_alias: z.string().nullish(),
  subcategory_name_alias: z.string().nullish(),
  description: z.string().nullish(),
  price: z.number(),
  event_id: z.number().nullish(),
  title: z.string(),
  ticket_pass: z.boolean().nullish(),
  province: z.string().nullish(),
  date: z.string().nullish(),
  start_time: z.string().nullish(),
  end_time: z.string().nullish(),
  end_date: z.string().nullish(),
  city: z.string().nullish(),
  google_location: z.string().nullish(),
  place: z.string().nullish(),
  address: z.string().nullish(),
  promo_price: z.number(),
  app_name: z.string().nullish(),
  rate: z.number(),
  product: productSchema.nullish(),
  instructor: instructorSchema.nullish(),
  duration: z.string().nullish(),
  added_to_wishlist: z.boolean().nullish(),
});

const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(onlineCourseItemSchema),
});

export interface OnlineCourseParams {
  page?: number;
  limit?: number;
}

export const getOnlineCourse = async ({
  page = 1,
  limit = 10,
}: OnlineCourseParams) => {
  const start = (page - 1) * limit;
  const { data } = await axios.get("/pilearning/online-course", {
    params: { limit, start },
  });

  return schema.parse(data).data;
};

export const useOnlineCourse = (params: OnlineCourseParams) =>
  useQuery(["onlineCourse", params], () => getOnlineCourse(params));

useOnlineCourse.prefetch = async (
  queryClient: QueryClient,
  params: OnlineCourseParams
) =>
  await queryClient.prefetchQuery(["onlineCourse", params], () =>
    getOnlineCourse(params)
  );
