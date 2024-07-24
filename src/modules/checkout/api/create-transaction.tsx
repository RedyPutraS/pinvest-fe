import { useMutation } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const createTransactionSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    rq_uuid: z.string(),
    rs_datetime: z.string(),
    error_code: z.string(),
    error_message: z.string(),
    va_number: z.string(),
    expired: z.string(),
    description: z.string(),
    total_amount: z.string(),
    amount: z.string(),
    fee: z.string(),
    bank_code: z.string(),
    online: z.boolean(),
    order_id: z.string(),
    handphone: z.string(),
    original_price: z.number(),
    voucher_number: z.any(),
    discount: z.number(),
    payment_method: z.string(),
    user_id: z.number(),
    qty: z.number(),
  }),
});

export const creatTransactionBodySchema = z.object({
  bank_code: z.string(),
  type: z.string(),
  app: z.string(),
  id: z.string(),
  voucher: z.string().nullish(),
});

export type CreateTransactionBodyType = z.infer<
  typeof creatTransactionBodySchema
>;

export const createTransaction = async (body: CreateTransactionBodyType) => {
  const { data } = await axios.post(`/transaction/create`, {
    bank_code: body.bank_code,
    type: body.type,
    app: body.app,
    id: body.id,
    voucher: body.voucher,
  });
  return createTransactionSchema.parse(data).data;
};

export const useCreateTransaction = () =>
  useMutation(["create-transaction"], (body: CreateTransactionBodyType) =>
    createTransaction(body)
  );
