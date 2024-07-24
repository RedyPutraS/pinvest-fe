import { useQuery } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const schema = z.object({
  id: z.number(),
  thumbnail_image: z.string(),
  added_to_wishlist: z.boolean(),
  thumbnail_video: z.string().nullish(),
  title: z.string(),
  // content: z.string(),
  type: z.string(),
  meta_title: z.string(),
  meta_description: z.string(),
  meta_keyword: z.string(),
  status: z.string(),
  author: z.string(),
  voucher: z.boolean(),
  purchased: z.boolean(),
  price: z.number(),
  promo_price: z.number(),
  updated_at: z.string(),
  language: z.string(),
  requirement: z.string(),
  description: z.array(
    z.object({ title: z.string(), description: z.string() })
  ),
  benefit: z.array(z.string()),
  rate: z.number(),
  rating_count: z.number(),
  rating_user_count: z.number(),
  duration: z.string(),
  article_count: z.number(),
  file_count: z.number(),
  instructor: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      title: z.string(),
      description: z.string(),
      image: z.string().nullish(),
    })
  ),
});

const schemaData = z.object({
  status: z.string(),
  message: z.string(),
  data: schema,
});

type Params = {
  id: string;
};

export const getDetailOnlineCourse = async ({ id }: Params) => {
  const { data } = await axios.get(`/pilearning/online-course/detail/${id}`);
  return schemaData.parse(data).data;
};

export const useDetailOnlineCourse = (params: Params) =>
  useQuery(["get-detail-online-course", params], () =>
    getDetailOnlineCourse(params)
  );

useDetailOnlineCourse.prefetch = async (
  queryClient: QueryClient,
  params: Params
) =>
  queryClient.prefetchQuery(["get-detail-online-course", params], () =>
    getDetailOnlineCourse(params)
  );
