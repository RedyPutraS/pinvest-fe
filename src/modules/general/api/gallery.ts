import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";
export interface Root {
  status: string;
  message: string;
  data: Gallery;
}

export interface Gallery {
  id: number;
  image?: string;
}

export const dataSchema = z.object({
  id: z.number(),
  image: z.string().nullish(),
});

export const rootSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      image: z.string().nullish(),
    })
  ),
});

export const getGallery = async () => {
  const { data } = await axios.get("/gallery");
  return rootSchema.parse(data);
};

export const useGallery = () => useQuery(["gallery"], () => getGallery());

useGallery.prefetch = async (queryClient: QueryClient) =>
  await queryClient.prefetchQuery(["gallery"], () => getGallery());
