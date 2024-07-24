import { z } from "zod";
import { axios } from "utils";
import { useQuery, type QueryClient } from "@tanstack/react-query";

export const eventSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    id: z.number(),
    type: z.string(),
    cover_image: z.string(),
    master_category_id: z.number(),
    master_subcategory_id: z.number().nullish(),
    category_name: z.string(),
    subcategory_name: z.string().nullish(),
    category_name_alias: z.string(),
    subcategory_name_alias: z.string().nullish(),
    description: z.array(
      z.object({ title: z.string(), description: z.string() })
    ),
    title: z.string(),
    province: z.string().nullish(),
    city: z.string().nullish(),
    google_location: z.string().nullish(),
    place: z.string().nullish(),
    address: z.string().nullish(),
    price: z.number(),
    promo_price: z.number(),
    app_name: z.string(),
    ticket: z.array(
      z.union([
        z.object({
          id: z.number(),
          date: z.string(),
          title: z.string(),
          description: z.string(),
          ticket_pass: z.boolean(),
          ticket_pass_id: z.any(),
          start_time: z.string(),
          end_time: z.string(),
          price: z.number(),
          quota: z.number(),
          quota_used: z.number(),
          quota_available: z.number(),
          duration: z.string(),
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
        }),
        z.object({
          id: z.number(),
          title: z.string(),
          description: z.string(),
          price: z.number(),
          quota: z.number(),
          quota_used: z.number(),
          quota_available: z.number(),
          duration: z.string(),
          date: z.array(
            z.object({
              date: z.string(),
              start_time: z.string(),
              end_time: z.string(),
            })
          ),
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
        }),
      ])
    ),
  }),
});

type Params = {
  slug: string;
};

export const getEvent = async ({ slug }: Params) => {
  const { data } = await axios.get(`/pievent/event/${slug}`);
  return eventSchema.parse(data).data;
};

export const useEvent = (params: Params) =>
  useQuery(["event", params], () => getEvent(params));

useEvent.prefetch = async (queryClient: QueryClient, params: Params) =>
  queryClient.prefetchQuery(["event", params], () => getEvent(params));
