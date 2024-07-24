import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export interface Banner {
  id: number | null | undefined;
  image: string | null | undefined;
  ads_url: string | null | undefined;
}

export const bannerSchema = z.object({
  status: z.string().nullish(),
  message: z.string().nullish(),
  data: z.array(
    z.object({
      id: z.number().nullish(),
      image: z.string().nullish(),
      ads_url: z.string().nullish(),
    })
  ),
});

export interface BannerParams {
  app?: string;
}

export const getBannerByApp = async ({ app }: BannerParams) => {
  const { data } = await axios.get("/banner-popup/by-app/" + app, {
    params: { app },
  });

  return bannerSchema.parse(data).data;
};

export const useBannerByApp = (params: BannerParams) =>
  useQuery(["pinews", params], () => getBannerByApp(params));
useBannerByApp.prefetch = async (
  queryClient: QueryClient,
  params: BannerParams
) =>
  await queryClient.prefetchQuery(["pinews", params], () =>
    getBannerByApp(params)
  );
