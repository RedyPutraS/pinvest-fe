import { useQuery } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const schema = z.object({
  tab: z.array(
    z.object({
      tab_name: z.string(),
      alias: z.string(),
      active: z.boolean(),
    })
  ),
  result: z.array(
    z
      .object({
        id: z.number().nullable(),
        order_id: z.string().nullable(),
        transaction_detail_id: z.number().nullable(),
        detail_event_id: z.number().nullable(),
        online_course_id: z.number().nullable(),
        membership_duration_id: z.number().nullable(),
        qty: z.number().nullable(),
        online: z.boolean().nullable(),
        ticket_pass: z.boolean().nullable(),
        price: z.string().nullable(),
        url_meeting: z.string().optional().nullable(),
        qr_code: z
          .array(z.object({ qr_code: z.string().optional().nullable() }))
          .optional()
          .nullable(),
        product: z
          .object({
            image: z.string().optional().nullable(),
            title: z.string().optional().nullable(),
            event_title: z.string().optional().nullable(),
            date: z.string().optional().nullable(),
            rate: z.number().optional().nullable(),
            rating_count: z.number().optional().nullable(),
            start_time: z.string().optional().nullable(),
            end_time: z.string().optional().nullable(),
            duration: z.string().optional().nullable(),
            membership_plan_id: z.number().optional().nullable(),
            plan_name: z.string().optional().nullable(),
            thumbnail_image: z.string().optional().nullable(),
            duration_name: z.string().optional().nullable(),
            duration_type: z.string().optional().nullable(),
          })
          .optional()
          .nullable(),
      })
      .optional()
  ),
});

const schemaData = z.object({
  status: z.string(),
  message: z.string(),
  data: schema,
});

type Params = {
  tab: string | undefined;
};

export const getActivityList = async ({ tab }: Params) => {
  const { data } = await axios.get(`/my-activity`, { params: { tab } });
  return schemaData.parse(data).data;
};

export const useActivityList = (params: Params) =>
  useQuery(["activity", params], () => getActivityList(params));

useActivityList.prefetch = async (queryClient: QueryClient, params: Params) =>
  queryClient.prefetchQuery(["activity", params], () =>
    getActivityList(params)
  );
