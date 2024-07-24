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
      productName: z.string(),
      image: z.string(),
      intruction: z.array(
        z.object({ name: z.string(), panduan: z.array(z.string()) })
      ),
    })
  ),
});

// eslint-disable-next-line @typescript-eslint/ban-types
type Params = {};

export const getListBank = async ({}: Params) => {
  const { data } = await axios.get("/transaction/list-bank", {
    params: {},
  });
  return listBankSchema.parse(data).data;
};

export const useListBank = (params: Params) =>
  useQuery(["list-bank", params], () => getListBank(params));

useListBank.prefetch = async (queryClient: QueryClient, params: Params) =>
  queryClient.prefetchQuery(["list-bank", params], () => getListBank(params));
