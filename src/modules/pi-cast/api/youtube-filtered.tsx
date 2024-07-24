import { useInfiniteQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    kind: z.string(),
    etag: z.string(),
    nextPageToken: z.string().nullish(),
    regionCode: z.string(),
    pageInfo: z.object({
      totalResults: z.number(),
      resultsPerPage: z.number(),
    }),
    items: z.array(
      z.union([
        z.object({
          kind: z.string(),
          etag: z.string(),
          id: z.object({ kind: z.string(), videoId: z.string() }),
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
            }),
            channelTitle: z.string(),
            liveBroadcastContent: z.string(),
            publishTime: z.string(),
          }),
          videoData: z.object({
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
              }),
              channelTitle: z.string(),
              tags: z.array(z.string()),
              categoryId: z.string(),
              liveBroadcastContent: z.string(),
              localized: z.object({
                title: z.string(),
                description: z.string(),
              }),
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
          }),
        }),
        z.object({
          kind: z.string(),
          etag: z.string(),
          id: z.object({ kind: z.string(), videoId: z.string() }),
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
            }),
            channelTitle: z.string(),
            liveBroadcastContent: z.string(),
            publishTime: z.string(),
          }),
          videoData: z.object({
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
              localized: z.object({
                title: z.string(),
                description: z.string(),
              }),
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
          }),
        }),
        z.object({
          kind: z.string(),
          etag: z.string(),
          id: z.object({ kind: z.string(), videoId: z.string() }),
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
            }),
            channelTitle: z.string(),
            liveBroadcastContent: z.string(),
            publishTime: z.string(),
          }),
          videoData: z.object({
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
              localized: z.object({
                title: z.string(),
                description: z.string(),
              }),
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
          }),
        }),
        z.object({
          kind: z.string(),
          etag: z.string(),
          id: z.object({ kind: z.string(), videoId: z.string() }),
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
            }),
            channelTitle: z.string(),
            liveBroadcastContent: z.string(),
            publishTime: z.string(),
          }),
          videoData: z.object({
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
              localized: z.object({
                title: z.string(),
                description: z.string(),
              }),
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
          }),
        }),
      ])
    ),
  }),
});
export interface YoutubeParams {
  search?: string;
  category?: string;
  type?: string;
  limit?: number;
  pageToken?: string;
}

const getPiCastYoutube = async ({
  pageToken = "",
  limit = 10,
  search,
  category,
  type,
}: YoutubeParams) => {
  const { data } = await axios.get("/picast/youtube", {
    params: { limit, pageToken, search, category, type },
  });
  return schema.parse(data).data;
};

export const useInfinitePiCastYoutube = (params: YoutubeParams) =>
  useInfiniteQuery({
    queryKey: ["infinitePiCastYoutube", params],
    queryFn: ({ pageParam = "" }) =>
      getPiCastYoutube({ ...params, pageToken: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });
