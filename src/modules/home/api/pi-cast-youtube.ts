import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";


export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface Id {
  kind: string;
  videoId: string;
  playlistId: string;
  channelId: string;
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

export interface Thumbnails {
  default: Default;
  medium: Medium;
  high: High;
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

export interface VideoData {
  kind: string
  etag: string
  id: string
  contentDetails: ContentDetails
  statistics: Statistics
}

export interface ContentDetails {
  duration: string
  dimension: string
  definition: string
  caption: string
  licensedContent: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contentRating: any[]
  projection: string
}

export interface Statistics {
  viewCount: string
  likeCount: string
  favoriteCount: string
  commentCount: string
}

export interface YoutubeItem {
  kind: string;
  etag: string;
  id: Id;
  snippet: Snippet;
  videoData?: VideoData
}

export interface PiCastYoutube {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: YoutubeItem[];
}

export const pageInfoSchema = z.object({
  totalResults: z.number(),
  resultsPerPage: z.number()
})

export const idSchema = z.object({
  kind: z.string(),
  videoId: z.string().nullish(),
  playlistId: z.string().nullish(),
  channelId: z.string().nullish()
})

export const defaultSchema = z.object({
  url: z.string(),
  width: z.number().nullish(),
  height: z.number().nullish()
})

export const mediumSchema = z.object({
  url: z.string(),
  width: z.number().nullish(),
  height: z.number().nullish()
})

export const highSchema = z.object({
  url: z.string(),
  width: z.number().nullish(),
  height: z.number().nullish()
})

export const thumbnailsSchema = z.object({
  default: defaultSchema,
  medium: mediumSchema,
  high: highSchema
})

export const snippetSchema = z.object({
  publishedAt: z.string(),
  channelId: z.string(),
  title: z.string(),
  description: z.string(),
  thumbnails: thumbnailsSchema,
  channelTitle: z.string(),
  liveBroadcastContent: z.string(),
  publishTime: z.string()
})

export const contentDetailsSchema = z.object({
  duration: z.string(),
  dimension: z.string(),
  definition: z.string(),
  caption: z.string(),
  licensedContent: z.boolean(),
  contentRating: z.array(z.any()),
  projection: z.string()
})

export const statisticsSchema = z.object({
  viewCount: z.string(),
  likeCount: z.string(),
  favoriteCount: z.string(),
  commentCount: z.string()
})

export const videoDataSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  id: z.string(),
  contentDetails: contentDetailsSchema,
  statistics: statisticsSchema
})

export const itemSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  id: idSchema,
  snippet: snippetSchema,
  videoData: videoDataSchema.nullish()
})

export const piCastYoutubeSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  nextPageToken: z.string().nullish(),
  regionCode: z.string(),
  pageInfo: pageInfoSchema,
  items: z.array(itemSchema)
})

export const youtubeVideoSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: piCastYoutubeSchema
})

export interface PiCastYoutubeParams {
  page?: number;
  limit?: number;
  type?: string;
  search?: string;
}

export const getPiCastYoutube = async ({
  page = 1,
  limit = 10,
  type,
  search,
}: PiCastYoutubeParams) => {
  const start = (page - 1) * limit;
  const { data } = await axios.get("/picast/youtube", {
    params: { limit, start, type, search },
  });
  return youtubeVideoSchema.parse(data).data.items;
};

export const usePiCastYoutube = (params: PiCastYoutubeParams) =>
  useQuery(["piCastYoutube", params], () => getPiCastYoutube(params));

usePiCastYoutube.prefetch = async (
  queryClient: QueryClient,
  params: PiCastYoutubeParams
) =>
  await queryClient.prefetchQuery(["piCastYoutube", params], () =>
    getPiCastYoutube(params)
  );