import { useQuery } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export interface Event {
  id: number;
  title: string;
  type: string;
  thumbnail_image: string;
  cover_image: string;
  master_category_id: number;
  master_subcategory_id?: number;
  category_name: string;
  subcategory_name?: string;
  category_name_alias: string;
  subcategory_name_alias?: string;
  description: string;
  province?: string;
  city: string;
  google_location: string;
  place?: string;
  address?: string;
  view: number;
  price: number;
  promo_price: number;
  app_name: string;
  rate: number;
  ticket: Ticket;
  added_to_wishlist: boolean;
}

export interface Ticket {
  date: string[];
  duration: string;
}

export const ticketSchema = z.object({
  date: z.array(z.string()),
  duration: z.string(),
});

export const daumSchema = z.object({
  id: z.number(),
  title: z.string(),
  type: z.string(),
  thumbnail_image: z.string(),
  cover_image: z.string(),
  master_category_id: z.number(),
  master_subcategory_id: z.number().nullish(),
  category_name: z.string(),
  subcategory_name: z.string().nullish(),
  category_name_alias: z.string(),
  subcategory_name_alias: z.string().nullish(),
  description: z.string(),
  province: z.string().nullish(),
  city: z.string().nullish(),
  google_location: z.string().nullish(),
  place: z.string().nullish(),
  address: z.string().nullish(),
  view: z.number(),
  price: z.number(),
  promo_price: z.number(),
  app_name: z.string(),
  rate: z.number(),
  added_to_wishlist: z.boolean(),
  ticket: ticketSchema,
});

export const rootSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(daumSchema),
});

export interface PiEventParams {
  page?: number;
  filter?: string | null;
  search?: string | null;
  category?: string | null;
  time?: "day" | "week" | null;
  type?: "online" | "offline" | null;
  price?: "free" | "paid" | null;
  limit?: number;
}

export const getPiEvents = async ({
  page = 1,
  filter,
  search,
  category,
  time,
  type,
  price,
  limit = 10,
}: PiEventParams) => {
  const start = (page - 1) * limit;
  const { data } = await axios.get("/pievent/event", {
    params: { limit, start, filter, search, category, time, type, price },
  });
  return rootSchema.parse(data).data;
};

export const usePiEvents = (params: PiEventParams) =>
  useQuery(["piEvents", params], () => getPiEvents(params));

usePiEvents.prefetch = async (
  queryClient: QueryClient,
  params: PiEventParams
) =>
  await queryClient.prefetchQuery(["piEvents", params], () =>
    getPiEvents(params)
  );
