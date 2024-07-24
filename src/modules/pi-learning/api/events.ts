import { useQuery } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const eventsSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      type: z.string(),
      // detail_event_id: z.number(),
      thumbnail_image: z.string(),
      cover_image: z.string(),
      master_category_id: z.number(),
      master_subcategory_id: z.number().nullish(),
      category_name: z.string(),
      subcategory_name: z.string().nullish(),
      category_name_alias: z.string(),
      subcategory_name_alias: z.string().nullish(),
      description: z.string(),
      // event_id: z.number(),
      title: z.string(),
      // ticket_pass: z.boolean(),
      province: z.string().nullish(),
      // date: z.string(),
      // end_date: z.string(),
      city: z.string().nullish(),
      google_location: z.string().nullish(),
      place: z.string().nullish(),
      address: z.string().nullish(),
      price: z.number(),
      rate: z.number(),
      promo_price: z.number(),
      app_name: z.string(),
      ticket: z.object({ date: z.array(z.string()), duration: z.string() }),
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
  page: string | null;
  filter: string | null;
  search: string | null;
  sort: string | null;
  category: string | null;
  time: string | null;
  subcategory: string | null;
};

export const getEvents = async ({
  page = "",
  filter = "new",
  search = "",
  sort = "",
  category = "",
  subcategory = "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  time = "week",
}: Params) => {
  const limit = 10;
  // const start = (page - 1) * limit;
  const start = 0;
  const { data } = await axios.get("/pilearning/event", {
    params: {
      page,
      limit,
      start,
      filter,
      sort,
      search,
      category,
      subcategory,
    },
  });

  return eventsSchema.parse(data);
};

export const useEvents = (params: Params) =>
  useQuery(["events", params], () => getEvents(params));

useEvents.prefetch = async (queryClient: QueryClient, params: Params) =>
  await queryClient.prefetchQuery(["events", params], () => getEvents(params));

const eventDetailSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    id: z.number(),
    type: z.string().nullish(),
    cover_image: z.string(),
    master_category_id: z.number().nullish(),
    master_subcategory_id: z.number().nullish(),
    category_name: z.string().nullish(),
    subcategory_name: z.string().nullish(),
    category_name_alias: z.string().nullish(),
    subcategory_name_alias: z.string().nullish(),
    description: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
    title: z.string(),
    duration: z.string().nullish(),
    province: z.string().nullish(),
    city: z.string().nullish().nullish(),
    google_location: z.string().nullish(),
    place: z.string().nullish(),
    address: z.string().optional().nullish(),
    price: z.number(),
    promo_price: z.number().nullish(),
    app_name: z.string().nullish(),
    ticket: z
      .array(
        z
          .object({
            title: z.string(),
            description: z.string(),
            id: z.number(),
            date: z.string(),
            ticket_pass: z.boolean().nullish(),
            ticket_pass_id: z.any().nullish(),
            start_time: z.string().nullish(),
            end_time: z.string().nullish(),
            price: z.number(),
            quota: z.number().nullish(),
            quota_used: z.number().nullish(),
            quota_available: z.number().nullish(),
            duration: z.string().nullish(),
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
          .nullish()
      )
      .nullish(),
  }),
});

type ParamsDetail = {
  slug: string;
};

export const getEventDetail = async ({ slug }: ParamsDetail) => {
  const { data } = await axios.get(`/pilearning/event/${slug}`);
  return eventDetailSchema.parse(data).data;
};

export const useEventDetail = (params: ParamsDetail) =>
  useQuery(["event-detail", params], () => getEventDetail(params));

useEventDetail.prefetch = async (
  queryClient: QueryClient,
  params: ParamsDetail
) =>
  queryClient.prefetchQuery(["event-detail", params], () =>
    getEventDetail(params)
  );
