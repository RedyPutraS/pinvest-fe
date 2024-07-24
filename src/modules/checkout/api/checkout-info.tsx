import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const cehckoutInfoSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    id: z.number(),
    thumbnail_image: z.string(),
    cover_image: z.string(),
    title: z.string(),
    date: z.string(),
    start_time: z.string(),
    end_time: z.string(),
    price: z.number(),
    // author_profile_picture: z.string(),
    // author_full_name: z.string(),
    rate: z.number(),
    rating_count: z.number(),
    duration: z.string(),
  }),
});

// eslint-disable-next-line @typescript-eslint/ban-types
type Params = {};

export const getCheckoutInfo = async (params: Params) => {
  const { data } = await axios.get(`/transaction/checkout`, { params });
  return cehckoutInfoSchema.parse(data).data;
};

export const useCheckoutInfo = (params: Params) =>
  useQuery(["checkout-info", params], () => getCheckoutInfo(params));
