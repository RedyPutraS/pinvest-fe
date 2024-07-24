import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export const daumSchema = z.object({
  id: z.number(),
  plan_name: z.string(),
  limit_inquiry: z.number(),
  description: z.string(),
  is_default: z.boolean(),
  allow_all_apps: z.boolean(),
  apps: z.array(z.any()).optional(),
});

export const rootSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(daumSchema),
});

export const getMembershipListPlan = async () => {
  const { data } = await axios.get("/membership/list-plan");
  return rootSchema.parse(data).data;
};

export const useMembershipListPlan = () =>
  useQuery(["membership-list-plan"], () => getMembershipListPlan());

useMembershipListPlan.prefetch = async (queryClient: QueryClient) =>
  await queryClient.prefetchQuery(["membership-list-plan"], () =>
    getMembershipListPlan()
  );
