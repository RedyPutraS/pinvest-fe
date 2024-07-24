import { useQuery } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const listBankSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      bankCode: z.string(),
      productCode: z.string(),
      name: z.string(),
      code: z.string(),
      fee: z.number(),
      country: z.string(),
      currency: z.string(),
      image: z.string(),
      intruction: z.array(
        z.object({ name: z.string(), panduan: z.array(z.string()) })
      ),
    })
  ),
});

// eslint-disable-next-line @typescript-eslint/ban-types
type Params = {};

export const getListBankXendit = async ({}: Params) => {
  const { data } = await axios.get("/transaction/listAvailableBank", {
    params: {},
  });
  return listBankSchema.parse(data).data;
};

export const useListBankXendit = (params: Params) =>
  useQuery(["list-bank", params], () => getListBankXendit(params));

useListBankXendit.prefetch = async (queryClient: QueryClient, params: Params) =>
  queryClient.prefetchQuery(["list-bank", params], () =>
    getListBankXendit(params)
  );
