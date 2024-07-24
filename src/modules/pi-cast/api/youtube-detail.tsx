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
          publishedAt: z.string(),
          channelId: z.string(),
          title: z.string(),
          description: z.string(),
          thumbnails: z.object({
            default: z.object({
              url: z.string(),
              width: z.number(),
              height: z.number(),
            }),
            medium: z.object({
              url: z.string(),
              width: z.number(),
              height: z.number(),
            }),
            high: z.object({
              url: z.string(),
              width: z.number(),
              height: z.number(),
            }),
            standard: z.object({
              url: z.string(),
              width: z.number(),
              height: z.number(),
            }),
            maxres: z.object({
              url: z.string(),
              width: z.number(),
              height: z.number(),
            }),
          }),
          channelTitle: z.string(),
          tags: z.array(z.string()),
          categoryId: z.string(),
          liveBroadcastContent: z.string(),
          defaultLanguage: z.string(),
          localized: z.object({ title: z.string(), description: z.string() }),
          defaultAudioLanguage: z.string(),
        }),
        contentDetails: z.object({
          duration: z.string(),
          dimension: z.string(),
          definition: z.string(),
          caption: z.string(),
          licensedContent: z.boolean(),
          contentRating: z.array(z.unknown()),
          projection: z.string(),
        }),
        statistics: z.object({
          viewCount: z.string(),
          likeCount: z.string(),
          favoriteCount: z.string(),
          commentCount: z.string(),
        }),
      })
    ),
    pageInfo: z.object({
      totalResults: z.number(),
      resultsPerPage: z.number(),
    }),
  }),
});

export const getYoutubeDetail = async (id: string) => {
  const { data } = await axios.get(`/picast/youtube/video-detail/${id}`);
  return schema.parse(data);
};

export const useYoutubeDetail = (id: string) =>
  useQuery(["piCastYoutubeDetail", id], () => getYoutubeDetail(id));

useYoutubeDetail.prefetch = async (queryClient: QueryClient, id: string) =>
  await queryClient.prefetchQuery(["piCastYoutubeDetail", id], () =>
    getYoutubeDetail(id)
  );
