import { useQuery } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const kotaSchema = z.object({
  id: z.number(),
  kota: z.string(),
});

const kotaDataSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(kotaSchema),
});

export const getKota = async () => {
  const { data } = await axios.get(`/master/kota`);
  return kotaDataSchema.parse(data).data;
};

export const useKota = () => useQuery(["kota"], () => getKota());
useKota.prefetch = async (queryClient: QueryClient) =>
  queryClient.prefetchQuery(["kota"], () => getKota());
