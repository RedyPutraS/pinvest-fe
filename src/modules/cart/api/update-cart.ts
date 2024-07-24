import { useMutation } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    id: z.number(),
    user_id: z.number(),
    qty: z.number(),
    type: z.string(),
    content_id: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
});

export type Body = {
  type: string;
  content_id: number;
  qty: number;
};

export const updateAddCart = async (body: Body) => {
  const { data } = await axios.post(`/cart-v2/update/${body.content_id}`, body);
  return schema.parse(data).data;
};

export const useUpdateCart = () =>
  useMutation(["update-cart"], (body: Body) => updateAddCart(body));
