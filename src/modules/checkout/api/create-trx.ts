import { useMutation } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    order_id: z.string(),
    handphone: z.string(),
    va_number: z.string(),
    payment_progress: z.string(),
    total_amount: z.number(),
  }),
  page: z.null(),
});

export type Body = {
  bank_code: string;
  voucher: string | null;
  membership_duration_id?: string;
};

export const createTrx = async (body: Body) => {
  const { data } = await axios.post(`/transaction/create-v2`, {
    bank_code: body.bank_code,
    voucher: body.voucher || null,
    membership_duration_id: body.membership_duration_id,
  });
  return schema.parse(data).data;
};

export const useCreateTrx = () =>
  useMutation(["post-create-trx"], (body: Body) => createTrx(body));
