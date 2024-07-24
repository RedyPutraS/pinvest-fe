import { useQuery } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const schema = z.array(z.any());

const schemaData = z.object({
  status: z.string(),
  message: z.string(),
  data: schema,
});

export const getWishlist = async () => {
  const { data } = await axios.get(`/wishlist-v2`, {});
  return schemaData.parse(data).data;
};

export const useWishlistCount = () =>
  useQuery(["get-wishlist"], () => getWishlist(), { enabled: false });

useWishlistCount.prefetch = async (queryClient: QueryClient) =>
  queryClient.prefetchQuery(["get-wishlist"], () => getWishlist());
