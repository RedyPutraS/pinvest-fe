import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    kind: z.string(),
    etag: z.string(),
    items: z.array(
      z.object({
        kind: z.string(),
        etag: z.string(),
        id: z.string(),
        snippet: z.object({
          title: z.string(),
          assignable: z.boolean(),
          channelId: z.string(),
        }),
      })
    ),
  }),
});

export const getYoutubeCategory = async () => {
  const { data } = await axios.get(`/picast/youtube/categories`);
  return schema.parse(data).data;
};

export const useYoutubeCategory = () =>
  useQuery(["piCastSpotifyCategory"], () => getYoutubeCategory());

useYoutubeCategory.prefetch = async (queryClient: QueryClient) =>
  await queryClient.prefetchQuery(["piCastSpotifyCategory"], () =>
    getYoutubeCategory()
  );
