import { useQuery } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export const schema = z.array(
  z.object({
    id: z.number(),
    type: z.string(),
    content_id: z.number(),
    data: z.object({
      id: z.number(),
      thumbnail_image: z.string(),
      title: z.string(),
      type: z.string(),
      meta_title: z.string(),
      meta_description: z.string(),
      meta_keyword: z.string(),
      status: z.string(),
      author: z.string(),
      voucher: z.boolean(),
      price: z.number(),
      promo_price: z.number(),
      rate: z.number(),
      rating_count: z.number(),
      description: z.string(),
      duration: z.string(),
      category_name: z.string().nullish(),
      app_name: z.string(),
    }),
  })
);

const schemaData = z.object({
  status: z.string(),
  message: z.string(),
  data: schema,
});

export const getWishlist = async () => {
  const { data } = await axios.get(`/wishlist-v2`, {});
  return schemaData.parse(data).data;
};

export const useWishlist = () =>
  useQuery(["get-wishlist"], () => getWishlist());

useWishlist.prefetch = async (queryClient: QueryClient) =>
  queryClient.prefetchQuery(["get-wishlist"], () => getWishlist());
