import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";
export interface Root {
  status: string;
  message: string;
  data: Data;
  page: any;
}

export interface Data {
  id: number;
  title: string;
  content: string;
  status: string;
}

export const dataSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  status: z.string(),
});

export const rootSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: dataSchema,
  page: z.any(),
});

export const getToc = async () => {
  const { data } = await axios.get("/syarat-ketentuan");
  return rootSchema.parse(data).data;
};

export const useToc = () => useQuery(["term-and-condition"], () => getToc());

useToc.prefetch = async (queryClient: QueryClient) =>
  await queryClient.prefetchQuery(["term-and-condition"], () => getToc());
