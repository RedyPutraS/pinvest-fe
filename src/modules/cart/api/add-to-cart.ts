import { useMutation } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    user_id: z.number(),
    qty: z.number(),
    type: z.string(),
    content_id: z.number(),
  }),
});

export type Body = {
  type: string;
  content_id: number;
  qty: number;
};

export const postAddToCart = async (body: Body) => {
  const { data } = await axios.post(`/cart-v2/add`, body);
  return schema.parse(data).data;
};

export const useAddToCart = () =>
  useMutation(["post-add-to-cart"], (body: Body) => postAddToCart(body));
