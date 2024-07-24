import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const appsSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      app_name: z.string(),
      alias: z.string(),
      category: z.array(
        z.object({
          id: z.number(),
          category_name: z.string(),
          alias: z.string(),
          subcategory: z.array(
            z.object({
              id: z.number(),
              subcategory_name: z.string(),
              alias: z.string(),
            })
          ),
        })
      ),
    })
  ),
});

export const getApps = async () => {
  // TODO: Disable mock if the API is already not too slow.
  // const mockData = appWithSubcategory;
  const { data } = await axios.get("/app", {
    params: {
      with: "subcategory",
    },
  });
  return appsSchema.parse(data).data;
};

export const useApps = () => useQuery(["apps"], () => getApps());

useApps.prefetch = async (queryClient: QueryClient) =>
  await queryClient.prefetchQuery(["apps"], () => getApps());

type Params = {
  appName: string;
};

export const getApp = async ({ appName }: Params) => {
  const data = await getApps();
  return data.find((app) => app.app_name.trim() === appName.trim());
};

export const useApp = (params: Params) =>
  useQuery(["app", params], () => getApp(params));

useApp.prefetch = async (queryClient: QueryClient, params: Params) =>
  await queryClient.prefetchQuery(["app", params], () => getApp(params));
