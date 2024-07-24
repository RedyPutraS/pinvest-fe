import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
export interface Root {
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  kind: string;
  etag: string;
  nextPageToken: string;
  items: YoutubeItemFromPlaylist[];
  pageInfo: PageInfo;
}

export interface YoutubeItemFromPlaylist {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: string;
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
}

export interface Thumbnails {
  default: Default;
  medium: Medium;
  high: High;
  standard: Standard;
  maxres: Maxres;
}

export interface Default {
  url: string;
  width: number;
  height: number;
}

export interface Medium {
  url: string;
  width: number;
  height: number;
}

export interface High {
  url: string;
  width: number;
  height: number;
}

export interface Standard {
  url: string;
  width: number;
  height: number;
}

export interface Maxres {
  url: string;
  width: number;
  height: number;
}

export interface ResourceId {
  kind: string;
  videoId: string;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

import { z } from "zod";

export const defaultSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
});

export const mediumSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
});

export const highSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
});

export const standardSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
});

export const maxresSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
});

export const resourceIdSchema = z
  .object({
    kind: z.string(),
    videoId: z.string(),
  })
  .nullish();

export const pageInfoSchema = z.object({
  totalResults: z.number(),
  resultsPerPage: z.number(),
});

export const thumbnailsSchema = z.object({
  default: defaultSchema,
  medium: mediumSchema,
  high: highSchema,
  standard: standardSchema,
  maxres: maxresSchema,
});

export const snippetSchema = z.object({
  publishedAt: z.string().nullish(),
  channelId: z.string().nullish(),
  title: z.string().nullish(),
  description: z.string().nullish(),
  thumbnails: thumbnailsSchema,
  channelTitle: z.string().nullish(),
  playlistId: z.string().nullish(),
  position: z.number().nullish(),
  resourceId: resourceIdSchema,
  videoOwnerChannelTitle: z.string().nullish(),
  videoOwnerChannelId: z.string().nullish(),
});

export const itemSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  id: z.string(),
  snippet: snippetSchema,
});

export const dataSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  nextPageToken: z.string().nullish(),
  items: z.array(itemSchema),
  pageInfo: pageInfoSchema,
});

export const rootSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: dataSchema,
});

export interface PiCastYoutubeByPlaylistIdParams {
  playlistId: string;
  limit?: number;
}

export const getPiCastYoutubeByPlaylistId = async ({
  playlistId,
}: PiCastYoutubeByPlaylistIdParams) => {
  const { data } = await axios.get(`/picast/youtube-playlist/${playlistId}`, {
    params: {},
  });
  return rootSchema.parse(data).data.items;
};

export const usePiCastYoutubeByPlaylistId = (
  params: PiCastYoutubeByPlaylistIdParams
) =>
  useQuery(["piCastYoutubeByPlaylistId", params], () =>
    getPiCastYoutubeByPlaylistId(params)
  );

usePiCastYoutubeByPlaylistId.prefetch = async (
  queryClient: QueryClient,
  params: PiCastYoutubeByPlaylistIdParams
) =>
  await queryClient.prefetchQuery(["piCastYoutubeByPlaylist", params], () =>
    getPiCastYoutubeByPlaylistId(params)
  );
