import { useQuery } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const accountSchema = z.object({
  id: z.number(),
  first_name: z.string().nullish(),
  last_name: z.string().nullish(),
  email: z.string().nullish(),
  no_hp: z.string().nullish(),
  birth_date: z.string().nullish(),
  gender: z.string().nullish(),
  status: z.string().nullish(),
  is_blocked: z.boolean(),
  profile_picture: z.string().nullish(),
  referral_code: z.string().nullish(),
  job_name: z.string().nullish(),
  img_status: z.string().nullish(),
});

const accountDataSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: accountSchema,
});

export const getAccount = async () => {
  const { data } = await axios.get(`/account`);

  return accountDataSchema.parse(data).data;
};

export const useAccount = () =>
  useQuery(["account-data"], () => getAccount(), { enabled: false });

useAccount.prefetch = async (queryClient: QueryClient) =>
  queryClient.prefetchQuery(["account-data"], () => getAccount());
