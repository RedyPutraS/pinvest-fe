import { useMutation } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(z.any()),
});

export type Body = {
  id: number;
};

export const removeFromCart = async (body: Body) => {
  const { data } = await axios.delete(`/cart-v2/remove/${body.id}`);
  return schema.parse(data).data;
};

export const useRemoveFromCart = () =>
  useMutation(["remove-from-cart"], (body: Body) => removeFromCart(body));
