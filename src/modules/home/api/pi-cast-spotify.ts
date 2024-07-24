import type { QueryClient } from "@tanstack/react-query";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { axios } from "utils";

import { z } from "zod";

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href?: unknown;
  total: number;
}

export interface Image {
  height?: unknown;
  url: string;
  width?: unknown;
}

export interface ExternalUrls2 {
  spotify: string;
}

export interface Owner {
  display_name: string;
  external_urls: ExternalUrls2;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface ExternalUrls3 {
  spotify: string;
}

export interface AddedBy {
  external_urls: ExternalUrls3;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface ExternalUrls4 {
  spotify: string;
}

export interface Artist {
  external_urls: ExternalUrls4;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalUrls5 {
  spotify: string;
}

export interface Image2 {
  height: number;
  url: string;
  width: number;
}

export interface Restrictions {
  reason: string;
}

export interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls5;
  href: string;
  id: string;
  images: Image2[];
  is_playable: boolean;
  name: string;
  release_date?: unknown;
  release_date_precision?: unknown;
  restrictions: Restrictions;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface ExternalUrls6 {
  spotify: string;
}

export interface Artist2 {
  external_urls: ExternalUrls6;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalIds {
  spotify: string;
}

export interface ExternalUrls7 {
  spotify: string;
}

export interface Track {
  album: Album;
  artists: Artist2[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls7;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track: boolean;
  track_number: number;
  type: string;
  uri: string;
}

export interface VideoThumbnail {
  url?: unknown;
}

export interface SpotifyItem {
  added_at: string;
  added_by: AddedBy;
  is_local: boolean;
  primary_color?: unknown;
  track: Track;
  video_thumbnail: VideoThumbnail;
}

export interface Tracks {
  href: string;
  items: SpotifyItem[];
  limit: number;
  next: string;
  offset: number;
  previous?: unknown;
  total: number;
}

export interface PiCastSpotify {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color?: unknown;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}

export interface PiCastSpotifyResponse {
  status: string;
  message: string;
  data: PiCastSpotify;
}

export const externalUrlsSchema = z.object({
  spotify: z.string(),
});

export const followersSchema = z.object({
  href: z.unknown().optional(),
  total: z.number(),
});

export const imageSchema = z.object({
  height: z.unknown().optional(),
  url: z.string(),
  width: z.unknown().optional(),
});

export const externalUrls2Schema = z.object({
  spotify: z.string(),
});

export const ownerSchema = z.object({
  display_name: z.string(),
  external_urls: externalUrls2Schema,
  href: z.string(),
  id: z.string(),
  type: z.string(),
  uri: z.string(),
});

export const externalUrls3Schema = z.object({
  spotify: z.string(),
});

export const addedBySchema = z.object({
  external_urls: externalUrls3Schema,
  href: z.string(),
  id: z.string(),
  type: z.string(),
  uri: z.string(),
});

export const externalUrls4Schema = z.object({
  spotify: z.string(),
});

export const artistSchema = z.object({
  external_urls: externalUrls4Schema,
  href: z.string(),
  id: z.string(),
  name: z.string(),
  type: z.string(),
  uri: z.string(),
});

export const externalUrls5Schema = z.object({
  spotify: z.string(),
});

export const image2Schema = z.object({
  height: z.number(),
  url: z.string(),
  width: z.number(),
});

export const restrictionsSchema = z.object({
  reason: z.string(),
});

export const albumSchema = z.object({
  album_type: z.string(),
  artists: z.array(artistSchema),
  available_markets: z.array(z.string()),
  external_urls: externalUrls5Schema,
  href: z.string(),
  id: z.string(),
  images: z.array(image2Schema),
  is_playable: z.boolean(),
  name: z.string(),
  release_date: z.unknown().optional(),
  release_date_precision: z.unknown().optional(),
  restrictions: restrictionsSchema,
  total_tracks: z.number(),
  type: z.string(),
  uri: z.string(),
});

export const externalUrls6Schema = z.object({
  spotify: z.string(),
});

export const artist2Schema = z.object({
  external_urls: externalUrls6Schema,
  href: z.string(),
  id: z.string(),
  name: z.string(),
  type: z.string(),
  uri: z.string(),
});

export const externalIdsSchema = z.object({
  spotify: z.string(),
});

export const externalUrls7Schema = z.object({
  spotify: z.string(),
});

export const trackSchema = z.object({
  album: albumSchema,
  artists: z.array(artist2Schema),
  available_markets: z.array(z.string()),
  disc_number: z.number(),
  duration_ms: z.number(),
  episode: z.boolean(),
  explicit: z.boolean(),
  external_ids: externalIdsSchema,
  external_urls: externalUrls7Schema,
  href: z.string(),
  id: z.string(),
  is_local: z.boolean(),
  is_playable: z.boolean(),
  name: z.string(),
  popularity: z.number(),
  preview_url: z.string().nullish(),
  track: z.boolean().nullish(),
  track_number: z.number(),
  type: z.string(),
  uri: z.string(),
});

export const videoThumbnailSchema = z.object({
  url: z.unknown().optional(),
});

export const itemSchema = z.object({
  added_at: z.string(),
  added_by: addedBySchema,
  is_local: z.boolean(),
  primary_color: z.unknown().optional(),
  track: trackSchema,
  video_thumbnail: videoThumbnailSchema,
});

export const tracksSchema = z.object({
  href: z.string(),
  items: z.array(itemSchema),
  limit: z.number(),
  next: z.string(),
  offset: z.number(),
  previous: z.unknown().optional(),
  total: z.number(),
});

export const piCastSpotifySchema = z.object({
  collaborative: z.boolean(),
  description: z.string(),
  external_urls: externalUrlsSchema,
  followers: followersSchema,
  href: z.string(),
  id: z.string(),
  images: z.array(imageSchema),
  name: z.string(),
  owner: ownerSchema,
  primary_color: z.unknown().optional(),
  public: z.boolean(),
  snapshot_id: z.string(),
  tracks: tracksSchema,
  type: z.string(),
  uri: z.string(),
});

export const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.any(),
});

export interface PiCastSpotifyParams {
  page?: number;
  limit?: number;
  type?: string;
  search?: string;
}

export const getPiCastSpotify = async ({
  page = 1,
  limit = 10,
  type,
  search,
}: PiCastSpotifyParams) => {
  const start = (page - 1) * limit;
  const { data } = await axios.get("/picast/spotify/episodes", {
    params: { limit, start, type, search },
  });
  return schema.parse(data).data.tracks.items;
};

export const usePiCastSpotify = (params: PiCastSpotifyParams) =>
  useQuery(["piCastSpotify", params], () => getPiCastSpotify(params));

usePiCastSpotify.prefetch = async (
  queryClient: QueryClient,
  params: PiCastSpotifyParams
) =>
  await queryClient.prefetchQuery(["piCastSpotify", params], () =>
    getPiCastSpotify(params)
  );

export const useInfinitePiCastSpotify = (limit: number) =>
  useInfiniteQuery({
    queryKey: ["infinitePiCastSpotify"],
    queryFn: ({ pageParam = 1 }) =>
      getPiCastSpotify({ page: pageParam, limit }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.length === limit ? pages.length + 1 : undefined,
  });

const detailSpotifyPlaylistSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    available_markets: z.array(z.string()),
    copyrights: z.array(z.unknown()),
    description: z.string(),
    explicit: z.boolean(),
    external_urls: z.object({ spotify: z.string() }),
    href: z.string(),
    html_description: z.string(),
    id: z.string(),
    images: z.array(
      z.object({ height: z.number(), url: z.string(), width: z.number() })
    ),
    is_externally_hosted: z.boolean(),
    languages: z.array(z.string()),
    media_type: z.string(),
    name: z.string(),
    publisher: z.string(),
    total_episodes: z.number(),
    type: z.string(),
    uri: z.string(),
  }),
});

const getPiCastSpotifyDetailPlaylist = async () => {
  const { data } = await axios.get(`/picast/spotify/detail-playlist`);
  return detailSpotifyPlaylistSchema.parse(data).data;
};
export const usePiCastSpotifyDetailPlaylist = () =>
  useQuery(["piCastSpotifyDetailPlaylist"], getPiCastSpotifyDetailPlaylist);
