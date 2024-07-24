import { useMutation } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    user_id: z.number(),
    type: z.string(),
    content_id: z.number(),
    updated_at: z.string(),
    created_at: z.string(),
    id: z.number(),
  }),
});

export type Body = {
  id: number;
  type: string;
  id_event: number;
};

export const postMoveToWishlist = async (body: Body) => {
  const { data } = await axios.post(
    `/cart-v2/move-wishlist/${body.id}/${body.type}/${body.id_event}`
  );
  return schema.parse(data).data;
};

export const useMoveToWishlist = () =>
  useMutation(["move-to-wishlist"], (body: Body) => postMoveToWishlist(body));
