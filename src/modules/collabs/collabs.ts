import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
    status: z.string(),
    category: z.string(),
    order_number: z.number().nullish(),
    apps: z.array(
      z.object({
        id: z.number(),
        app_name: z.string(),
        alias: z.string(),
        vector_image: z.string().nullish(),
        description: z.string().nullish(),
      })
    ),
  }),
});

export const getCollabs = async () => {
  const { data } = await axios.get("/collabs");
  return schema.parse(data).data;
};

export const useCollabs = () => useQuery(["collabs"], () => getCollabs());

useCollabs.prefetch = async (queryClient: QueryClient) =>
  await queryClient.prefetchQuery(["collabs"], () => getCollabs());
