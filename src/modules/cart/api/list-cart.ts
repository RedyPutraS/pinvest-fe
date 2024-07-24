import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export const instructorSchema = z.object({
  id: z.number(),
  name: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.any(),
});

export const data2Schema = z.object({
  online_course_id: z.number().nullish(),
  image: z.string().nullish(),
  title: z.string(),
  description: z.string(),
  author: z.string().nullish(),
  rate: z.number(),
  rating_count: z.number(),
  price: z.number(),
  promo_price: z.number(),
  duration: z.string().nullish(),
  instructor: instructorSchema.nullish(),
  event_id: z.number().nullish(),
  type: z.string().nullish(),
  detail_event_id: z.number().nullish(),
  thumbnail_image: z.string().nullish(),
  cover_image: z.string().nullish(),
  master_category_id: z.number().nullish(),
  master_subcategory_id: z.any(),
  category_name: z.string().nullish(),
  subcategory_name: z.any(),
  category_name_alias: z.string().nullish(),
  subcategory_name_alias: z.any(),
  event_title: z.string().nullish(),
  province: z.string().nullish(),
  date: z.string().nullish(),
  end_date: z.string().nullish(),
  city: z.string().nullish(),
  google_location: z.string().nullish(),
  place: z.string().nullish(),
  address: z.string().nullish(),
  app_name: z.string().nullish(),
  fee: z.number().nullish(),
});

export const itemSchema = z.object({
  id: z.number(),
  qty: z.number(),
  type: z.string(),
  content_id: z.number(),
  data: data2Schema.nullish(),
});

export const dataSchema = z.object({
  total_price: z.number(),
  items: z.array(itemSchema),
  admin_fee: z.number().nullish(),
});

export const rootSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: dataSchema,
  page: z.any(),
});

export const getCartList = async () => {
  const { data } = await axios.get(`/cart-v2`, {});
  return rootSchema.parse(data).data;
};

export const useCartList = () =>
  useQuery(["cart-list"], () => getCartList(), { enabled: false });
