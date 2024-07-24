import { useQuery } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const statusSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    id: z.string(),
    type: z.string(),
    country: z.string().nullish(),
    business_id: z.string().nullish(),
    customer_id: z.string().nullish(),
    reference_id: z.any().nullish(),
    expired_at: z.string(),
    reusability: z.string().nullish(),
    status: z.string().nullish(),
    actions: z.array(z.object({})).nullish(),
    description: z.string().nullish(),
    created: z.string().nullish(),
    updated: z.string().nullish(),
    metadata: z.string().nullish(),
    billing_information: z
      .object({
        country: z.string().nullish(),
        street_line1: z.string().nullish(),
        street_line2: z.string().nullish(),
        city: z.string().nullish(),
        province_state: z.string().nullish(),
        postal_code: z.string().nullish(),
      })
      .nullish(),
    intruction: z.array(
      z.object({ name: z.string(), panduan: z.array(z.string()) })
    ),
    failure_code: z.string().nullish(),
    ewallet: z.string().nullish(),
    direct_bank_transfer: z.string().nullish(),
    direct_debit: z.string().nullish(),
    card: z.string().nullish(),
    over_the_counter: z.string().nullish(),
    qr_code: z.string().nullish(),
    order_id: z.string().nullish(),
    bank_image: z.string().nullish(),
    virtual_account: z.object({
      amount: z.number().nullish(),
      currency: z.string().nullish(),
      channel_code: z.string().nullish(),
      channel_properties: z.object({
        customer_name: z.string().nullish(),
        virtual_account_number: z.string().nullish(),
        expires_at: z.string(),
      }),
    }),
  }),
});

// eslint-disable-next-line @typescript-eslint/ban-types
type Params = {
  orderId: string;
};

export const getStatusByOrderIdXendit = async ({ orderId }: Params) => {
  const { data } = await axios.get("/transaction/statusPaymentOrder", {
    params: { order_id: orderId },
  });

  return statusSchema.parse(data).data;
};

export const useStatusByOrderId = (params: Params) =>
  useQuery(["status-order-id", params], () => getStatusByOrderIdXendit(params));

useStatusByOrderId.prefetch = async (
  queryClient: QueryClient,
  params: Params
) =>
  queryClient.prefetchQuery(["status-order-id", params], () =>
    getStatusByOrderIdXendit(params)
  );
