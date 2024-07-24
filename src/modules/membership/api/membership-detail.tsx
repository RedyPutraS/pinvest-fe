import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export const durationSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.string(),
  duration: z.number(),
  price: z.number(),
});

export const dataSchema = z.object({
  id: z.number(),
  plan_name: z.string(),
  limit_inquiry: z.number(),
  description: z.string(),
  is_default: z.boolean(),
  allow_all_apps: z.boolean(),
  thumbnail_image: z.string(),
  apps: z.array(z.any()).nullish(),
  durations: z.array(durationSchema),
});

export const rootSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: dataSchema,
});

interface Params {
  id: string;
}

export const getMembershipDetailPlan = async ({ id }: Params) => {
  const { data } = await axios.get(`/membership/detail-plan/${id}`);
  return rootSchema.parse(data).data;
};

export const useMembershipDetailPlan = (params: Params) =>
  useQuery(["membership-detail-plan", params], () =>
    getMembershipDetailPlan(params)
  );

useMembershipDetailPlan.prefetch = async (
  queryClient: QueryClient,
  params: Params
) =>
  await queryClient.prefetchQuery(["membership-detail-plan"], () =>
    getMembershipDetailPlan(params)
  );
