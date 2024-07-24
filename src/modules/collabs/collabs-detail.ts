import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    detail: z.object({
      id: z.number(),
      app_name: z.string(),
      alias: z.string(),
      banner_image: z.string(),
      description: z.string(),
    }),
    partnership_benefit: z.array(
      z.object({
        id: z.number(),
        title: z.string(),
        image: z.string(),
        description: z.string(),
      })
    ),
  }),
});

interface Params {
  alias: string;
}

export const getCollabsDetail = async ({ alias }: Params) => {
  const { data } = await axios.get(`/collabs/detail/${alias}`);

  return schema.parse(data).data;
};

export const useCollabsDetail = (params: Params) =>
  useQuery(["collabs-detail", params], () => getCollabsDetail(params));

useCollabsDetail.prefetch = async (queryClient: QueryClient, params: Params) =>
  await queryClient.prefetchQuery(["collabs-detail", params], () =>
    getCollabsDetail(params)
  );
