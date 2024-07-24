import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    id: z.number(),
    voucher_number: z.string().nullish(),
    payment_progress: z.string(),
    payment_method: z.string().nullish(),
    order_id: z.string(),
    price: z.string(),
    fee_pg: z.string(),
    total_amount: z.string(),
    discount_type: z.string().nullish(),
    discount: z.string(),
    created_at: z.string(),
    detail_transaction: z
      .array(
        z.object({
          content_exclusive: z.any().nullish(),
          id: z.number(),
          price: z.string().nullish(),
          detail_event_id: z.number().nullish(),
          online_course_id: z.number().nullish(),
          membership_duration_id: z.number().nullish(),
          transaction_type: z.string(),
          qty: z.number().nullish(),
          online: z.boolean(),
          ticket_pass: z.boolean(),
          url_meeting: z.string().optional().nullable(),
          product: z.object({
            image: z.string().optional().nullable(),
            title: z.string().optional().nullable(),
            event_title: z.string().optional().nullable(),
            date: z.string().optional().nullable(),
            rate: z.number().optional(),
            rating_count: z.number().optional().nullable(),
            start_time: z.string().optional().nullable(),
            end_time: z.string().optional().nullable(),
            duration: z.string().optional().nullable(),
            membership_plan_id: z.number().optional().nullable(),
            plan_name: z.string().optional().nullable(),
            thumbnail_image: z.string().optional(),
            description: z.string().optional(),
            duration_name: z.string().optional().nullable(),
            duration_type: z.string().optional().nullable(),
          }),
          ticket_pass_item: z
            .array(
              z.object({
                image: z.string(),
                title: z.string(),
                event_title: z.string(),
                date: z.string(),
                rate: z.number(),
                rating_count: z.number(),
                start_time: z.string(),
                end_time: z.string(),
                url_meeting: z.string().optional().nullable(),
              })
            )
            .nullish(),
          qr_code: z.array(z.unknown()).nullish(),
        })
      )
      .nullish(),
    total_fee: z.number(),
    fee_detail: z.array(
      z.object({ title: z.string(), fee: z.string(), fee_type: z.string() })
    ),
  }),
});

type Params = {
  id: string;
};

export const getTransactionDetail = async ({ id }: Params) => {
  const { data } = await axios.get(
    `/transaction/detail?order_id=${encodeURIComponent(id)}`
  );

  return schema.parse(data).data;
};

export const useTransactionDetail = (params: Params) =>
  useQuery(["transaction-detail", params], () => getTransactionDetail(params));

useTransactionDetail.prefetch = async (
  queryClient: QueryClient,
  params: Params
) =>
  queryClient.prefetchQuery(["transaction-detail", params], () =>
    getTransactionDetail(params)
  );

export const transactionListSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      order_id: z.string(),
      price: z.string(),
      fee_pg: z.string().nullish(),
      total_amount: z.string(),
      payment_progress: z.string(),
      created_at: z.string(),
      app_name: z.string(),
      transaction_type: z.string(),
      total_fee: z.any().nullish(),
      total_items: z.number(),
    })
  ),
});

export type ListParams = {
  page: number;
  limit: number;
  payment_progress?: string;
};
export const getTransactionList = async ({
  page = 1,
  limit = 3,
  payment_progress,
}: ListParams) => {
  const start = (page - 1) * limit;
  const { data } = await axios.get("/transaction/list-transaction", {
    params: { limit, start, payment_progress },
  });
  return transactionListSchema.parse(data).data;
};

export const useTransactionList = (params: ListParams) =>
  useQuery(["transaction-list", params], () => getTransactionList(params));

useTransactionList.prefetch = async (
  queryClient: QueryClient,
  params: ListParams
) =>
  queryClient.prefetchQuery(["transaction-list", params], () =>
    getTransactionList(params)
  );
