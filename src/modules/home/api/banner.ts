import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";



export interface Banner {
  id: number
  slider_image: string
  title?: string
  description?: string
  url?: string
  order_number: number
}

export const bannerSchema = z.object({
  id: z.number(),
  slider_image: z.string(),
  title: z.string().nullish(),
  description: z.string().nullish(),
  url: z.string().nullish(),
  order_number: z.number().nullish()
})

export const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(bannerSchema)
})


export interface BannerParams {
  tab?: string
}

export const getBanner = async ({
  tab = "homepage"
}: BannerParams) => {
  const { data } = await axios.get("/banner", {
    params: { tab },
  });
  return schema.parse(data).data;
};

export const useBanner = (params: BannerParams) =>
  useQuery(["banner", params], () => getBanner(params));

useBanner.prefetch = async (
  queryClient: QueryClient,
  params: BannerParams
) =>
  await queryClient.prefetchQuery(["banner", params], () =>
    getBanner(params)
  );