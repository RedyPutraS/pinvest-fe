import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export const daumSchema = z.object({
  id: z.number(),
  title: z.string(),
  image: z.string(),
  description: z.string(),
});

export const rootSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(daumSchema),
});

interface Params {
  type: string;
}

export const getMembershipBenefit = async ({ type }: Params) => {
  const { data } = await axios.get("/master/benefit", {
    params: { type },
  });
  return rootSchema.parse(data).data;
};

export const useMembershipBenefit = (params: Params) =>
  useQuery(["membership-benefit", params], () => getMembershipBenefit(params));

useMembershipBenefit.prefetch = async (
  queryClient: QueryClient,
  params: Params
) =>
  await queryClient.prefetchQuery(["about-us", params], () =>
    getMembershipBenefit(params)
  );
