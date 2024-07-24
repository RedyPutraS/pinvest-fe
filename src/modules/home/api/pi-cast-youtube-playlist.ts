import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
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

export interface Thumbnails {
  default: Default;
  medium: Medium;
  high: High;
  standard: Standard;
  maxres: Maxres;
}

export interface Localized {
  title: string;
  description: string;
}

export interface Snippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  localized: Localized;
}

export interface YoutubePlaylistItem {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
}

export interface PiCastYoutubePlaylist {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: YoutubePlaylistItem[];
}

export interface PiCastYoutubePlaylistResponse {
  status: string;
  message: string;
  data: PiCastYoutubePlaylist;
}

export const pageInfoSchema = z.object({
  totalResults: z.number(),
  resultsPerPage: z.number(),
});

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

export const maxresSchema = z
  .object({
    url: z.string(),
    width: z.number(),
    height: z.number(),
  })
  .nullish();

export const thumbnailsSchema = z
  .object({
    default: defaultSchema,
    medium: mediumSchema,
    high: highSchema,
    standard: standardSchema,
    maxres: maxresSchema,
  })
  .nullish();

export const localizedSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const snippetSchema = z.object({
  publishedAt: z.string(),
  channelId: z.string(),
  title: z.string(),
  description: z.string(),
  thumbnails: thumbnailsSchema,
  channelTitle: z.string(),
  localized: localizedSchema,
});

export const youtubePlaylistItemSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  id: z.string(),
  snippet: snippetSchema,
});

export const piCastYoutubePlaylistSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  pageInfo: pageInfoSchema,
  items: z.any(),
});

export const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: piCastYoutubePlaylistSchema,
});

export interface PiCastYoutubePlaylistParams {
  page?: number;
  limit?: number;
  type?: string;
  search?: string;
}

export const getPiCastYoutubePlaylist = async ({
  page = 1,
  limit = 10,
  type,
  search,
}: PiCastYoutubePlaylistParams) => {
  const start = (page - 1) * limit;
  const { data } = await axios.get("/picast/youtube-playlist", {
    params: { limit, start, type, search },
  });
  return schema.parse(data).data.items;
};

export const usePiCastYoutubePlaylist = (params: PiCastYoutubePlaylistParams) =>
  useQuery(["piCastYoutubePlaylist", params], () =>
    getPiCastYoutubePlaylist(params)
  );

usePiCastYoutubePlaylist.prefetch = async (
  queryClient: QueryClient,
  params: PiCastYoutubePlaylistParams
) =>
  await queryClient.prefetchQuery(["piCastYoutubePlaylist", params], () =>
    getPiCastYoutubePlaylist(params)
  );
