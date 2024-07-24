import { z } from "zod";
import { axios } from "utils";
import { useQuery, type QueryClient } from "@tanstack/react-query";

export const eventsSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      added_to_wishlist: z.boolean(),
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
      title: z.string(),
      province: z.string().nullish(),
      city: z.string().nullish(),
      google_location: z.string().nullish(),
      place: z.string().nullish(),
      address: z.string().nullish(),
      price: z.number(),
      promo_price: z.number(),
      app_name: z.string(),
      rate: z.number(),
      ticket: z.object({ date: z.array(z.string()), duration: z.string() }),
      instructor: z
        .array(
          z.object({
            id: z.number(),
            name: z.string(),
            description: z.string(),
            image: z.any(),
          })
        )
        .nullish(),
    })
  ),
  page: z.object({
    total_data: z.number(),
    total_page: z.number(),
    current_page: z.number(),
    prev_page_url: z.string().nullish(),
    next_page_url: z.string().nullish(),
    links: z.array(
      z.object({
        url: z.string().nullish(),
        label: z.string(),
        active: z.boolean(),
      })
    ),
  }),
});

type Params = {
  time: string | null;
  type: string | null;
  page: string | null;
};

export const getEvents = async ({ time, type }: Params) => {
  const { data } = await axios.get("/pievent/event", {
    params: { time, type },
  });
  return eventsSchema.parse(data);
};

export const useEvents = (params: Params) =>
  useQuery(["events", params], () => getEvents(params));

useEvents.prefetch = async (queryClient: QueryClient, params: Params) =>
  queryClient.prefetchQuery(["events", params], () => getEvents(params));
