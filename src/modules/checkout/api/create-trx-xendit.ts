import { useMutation } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    rq_uuid: z.string().nullish(),
    rs_datetime: z.string().nullish(),
    error_code: z.string().nullish(),
    error_message: z.string().nullish(),
    va_number: z.string().nullish(),
    expired: z.string().nullish(),
    description: z.string().nullish(),
    total_amount: z.number(),
    fee: z.string().nullish(),
    bank_code: z.string().nullish(),
    order_id: z.string().nullish(),
    currency: z.string().nullish(),
    amount: z.string().nullish(),
    result: z
      .object({
        payment_method: z.object({
          type: z.string().nullish(),
          reusability: z.string().nullish(),
          reference_id: z.string().nullish(),
          virtual_account: z.object({
            channel_code: z.string().nullish(),
            channel_properties: z.object({
              customer_name: z.string().nullish(),
            }),
          }),
        }),
        metadata: z.object({
          sku: z.string().nullish(),
        }),
      })
      .nullish(),
  }),
});

export const creatTransactionBodySchema = z.object({
  bank_code: z.string(),
  type: z.string(),
  app: z.string(),
  id: z.string(),
  qty: z.number(),
  voucher: z.string().nullish(),
  total: z.number().nullish(),
});

export type CreateTransactionBodyType = z.infer<
  typeof creatTransactionBodySchema
>;

export const createTrxXendit = async (body: CreateTransactionBodyType) => {
  const { data } = await axios.post(`/transaction/createV3`, {
    bank_code: body.bank_code,
    type: body.type,
    app: body.app,
    id: body.id,
    qty: body.qty,
    voucher: body.voucher,
    total: body.total,
  });

  return schema.parse(data).data;
};

export const useCreateTrxXendit = () =>
  useMutation(["post-create-trx"], (body: CreateTransactionBodyType) =>
    createTrxXendit(body)
  );
