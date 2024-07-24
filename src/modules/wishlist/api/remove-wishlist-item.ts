import { useMutation } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(z.any()),
});

type Params = {
  id: number;
};

type Body = {
  type: string | null;
  content_id: number;
};

export const removeFromWishlist = async (body: Body, { id }: Params) => {
  const { data } = await axios.delete(`/wishlist-v2/remove/${id}`, {
    data: { body },
    params: { id },
  });
  return schema.parse(data).data;
};

export const useRemoveFromWishlistItem = (params: Params) =>
  useMutation(["remove-from-wishlist", params], (body: Body) =>
    removeFromWishlist(body, params)
  );
