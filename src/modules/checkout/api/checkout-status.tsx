import { useQuery } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const statusSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    intruction: z.array(
      z.object({ name: z.string(), panduan: z.array(z.string()) })
    ),
    rq_uuid: z.string(),
    rs_datetime: z.string(),
    error_code: z.string(),
    error_message: z.string(),
    comm_code: z.string(),
    member_code: z.any(),
    tx_id: z.string(),
    order_id: z.string(),
    ccy_id: z.string(),
    amount: z.string(),
    refund_amount: z.number(),
    tx_status: z.string(),
    tx_reason: z.string(),
    tx_process: z.string(),
    tx_date: z.string(),
    created: z.string(),
    expired: z.string(),
    bank_name: z.string(),
    product_name: z.string(),
    product_value: z.string(),
    payment_ref: z.string(),
    merchant_code: z.string(),
    token: z.string(),
    member_cust_id: z.string(),
    member_cust_name: z.string(),
    debit_from_name: z.string(),
    debit_from_bank: z.string(),
    credit_to: z.string(),
    credit_to_name: z.string(),
    credit_to_bank: z.string(),
    payment_datetime: z.string(),
    va_number: z.string(),
    payment_progress: z.string(),
    total_amount: z.string(),
    bank_image: z.string(),
  }),
});

// eslint-disable-next-line @typescript-eslint/ban-types
type Params = {
  orderId: string;
};

export const getStatusByOrderId = async ({ orderId }: Params) => {
  const { data } = await axios.get("/transaction/check", {
    params: { order_id: orderId },
  });
  return statusSchema.parse(data).data;
};

export const useStatusByOrderId = (params: Params) =>
  useQuery(["status-order-id", params], () => getStatusByOrderId(params));

useStatusByOrderId.prefetch = async (
  queryClient: QueryClient,
  params: Params
) =>
  queryClient.prefetchQuery(["status-order-id", params], () =>
    getStatusByOrderId(params)
  );
