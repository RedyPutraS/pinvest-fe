/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const cehckoutInfoSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    total_price: z.number(),
    total_fee: z.number(),
    total_amount: z.number(),
    discount: z.number(),
    discount_type: z.string().nullish(),
    fee_detail: z.array(
      z.object({ title: z.string(), fee: z.number(), fee_type: z.string() })
    ),
    items: z.array(
      z.union([
        z.object({
          id: z.number(),
          user_id: z.number(),
          qty: z.number(),
          type: z.literal("online-course"),
          content_id: z.number(),
          created_at: z.string(),
          updated_at: z.string(),
          data: z.object({
            online_course_id: z.number().nullish(),
            image: z.string().nullish(),
            title: z.string(),
            description: z.string(),
            author: z.string().nullish(),
            rate: z.number(),
            rating_count: z.number(),
            price: z.number(),
            promo_price: z.number(),
            duration: z.string(),
            instructor: z.object({
              id: z.number(),
              name: z.string(),
              title: z.string(),
              description: z.string(),
              image: z.string(),
            }),
          }),
        }),
        z.object({
          id: z.number(),
          user_id: z.number(),
          qty: z.number(),
          type: z.literal("event"),
          content_id: z.number(),
          created_at: z.string(),
          updated_at: z.string(),
          data: z.object({
            event_id: z.number(),
            type: z.string(),
            detail_event_id: z.number(),
            thumbnail_image: z.string().nullish(),
            cover_image: z.string(),
            master_category_id: z.number(),
            master_subcategory_id: z.number(),
            category_name: z.string(),
            subcategory_name: z.string(),
            category_name_alias: z.string(),
            subcategory_name_alias: z.string(),
            author: z.string().nullish(),
            description: z.string(),
            price: z.number(),
            title: z.string(),
            province: z.string().nullish(),
            date: z.string(),
            end_date: z.string().nullish(),
            city: z.string().nullish(),
            google_location: z.string().nullish(),
            place: z.string().nullish(),
            address: z.string().nullish(),
            promo_price: z.number(),
            app_name: z.string(),
            rate: z.number(),
            rating_count: z.number(),
          }),
        }),
      ])
    ),
  }),
});

// eslint-disable-next-line @typescript-eslint/ban-types
type Params = {
  voucher?: string;
  membership_duration_id?: string;
};

export const getCheckoutInfo = async (params: Params) => {
  const { data } = await axios.post(`/transaction/checkout`, {
    voucher_number: params.voucher,
    membership_duration_id: params.membership_duration_id,
  });
  return data.data;
};

export const useCheckoutInfo = (params: Params) =>
  useQuery(["checkout-info", params], () => getCheckoutInfo(params), {
    enabled: false,
    cacheTime: 0,
    keepPreviousData: false,
  });
