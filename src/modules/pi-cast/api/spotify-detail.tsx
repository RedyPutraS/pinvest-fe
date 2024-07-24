import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    audio_preview_url: z.string(),
    description: z.string(),
    duration_ms: z.number(),
    explicit: z.boolean(),
    external_urls: z.object({ spotify: z.string() }),
    href: z.string(),
    html_description: z.string(),
    id: z.string(),
    images: z.array(
      z.object({ height: z.number(), url: z.string(), width: z.number() })
    ),
    is_externally_hosted: z.boolean(),
    is_playable: z.boolean(),
    language: z.string(),
    languages: z.array(z.string()),
    name: z.string(),
    release_date: z.string(),
    release_date_precision: z.string(),
    show: z.object({
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
    type: z.string(),
    uri: z.string(),
  }),
});

export const getSpotifyDetail = async (id: string) => {
  const { data } = await axios.get(`/picast/spotify/episodes/${id}`);
  return schema.parse(data).data;
};

export const useSpotifyDetail = (id: string) =>
  useQuery(["piCastSpotifyDetail", id], () => getSpotifyDetail(id));

useSpotifyDetail.prefetch = async (queryClient: QueryClient, id: string) =>
  await queryClient.prefetchQuery(["piCastSpotifyDetail", id], () =>
    getSpotifyDetail(id)
  );
