import { useMutation } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    total_price: z.number(),
    discount: z.number(),
    discount_type: z.string(),
    total_amount: z.number(),
  }),
});

export type Body = {
  voucher_number: string;
};

export const postVoucherCheck = async (body: Body) => {
  const { data } = await axios.post(`/cart-v2/check-voucher`, body);
  return schema.parse(data).data;
};

export const useVoucherCheck = () =>
  useMutation(["post-voucher-check"], (body: Body) => postVoucherCheck(body));
