import { axios } from "utils";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
export interface PiCircleArticle {
  id: number;
  thumbnail_image: string;
  title: string;
  description: string;
  author: string;
  publish_at?: string;
  category_name: string;
  subcategory_name: string;
  province?: string;
  city?: string;
  address?: string;
  google_location?: string;
  place?: string;
}

const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      thumbnail_image: z.string(),
      title: z.string(),
      description: z.string(),
      author: z.string(),
      publish_at: z.string().nullish(),
      category_name: z.string(),
      subcategory_name: z.string(),
      province: z.string().nullish(),
      city: z.string().nullish(),
      address: z.string().nullish(),
      google_location: z.string().nullish(),
      view: z.number(),
      place: z.string().nullish(),
      like: z.number(),
      rate: z.number(),
      comment: z.number(),
    })
  ),
  page: z.object({
    total_data: z.number(),
    total_page: z.number(),
    current_page: z.number(),
    prev_page_url: z.string().nullish(),
    next_page_url: z.string().nullish(),
    links: z.array(
      z.object({
        url: z.string().nullish(),
        label: z.string(),
        active: z.boolean(),
      })
    ),
  }),
});

interface PiCircleParams {
  sort?: string;
  page?: string | null;
  limit?: number;
  category?: string;
  subcategory?: string;
  search?: string;
  filter?: string;
}

export const getPiCircleArticle = async ({
  page = "1",
  limit = 3,
  category,
  sort,
  subcategory,
  search,
  filter,
}: PiCircleParams) => {
  // const start = (page - 1) * limit;
  const start = 0;
  const { data } = await axios.get("/picircle/article", {
    params: { limit, start, category, subcategory, search, filter, sort, page },
  });
  return schema.parse(data);
};

export const usePiCircleArticle = (params: PiCircleParams) =>
  useQuery(["usePiCircleArticle", params], () => getPiCircleArticle(params));

usePiCircleArticle.prefetch = async (
  queryClient: QueryClient,
  params: PiCircleParams
) =>
  queryClient.prefetchQuery(["usePiCircleArticle", params], () =>
    getPiCircleArticle(params)
  );
export const likeShareSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    like: z.number(),
    share: z.number(),
    type: z.string(),
    app: z.string(),
  }),
  page: z.null(),
});
export const getLikeShare = async (id: string) => {
  const { data } = await axios.get(`/picircle/likeshare/${id}`, {
    params: { type: "article" },
  });
  return likeShareSchema.parse(data);
};

export const useLikeShare = (id: string) =>
  useQuery(["useLikeShare", id], () => getLikeShare(id));

export const postForum = async (id: string) => {
  const schema = z.object({
    status: z.string(),
    message: z.string(),
    data: z.array(z.unknown()),
    page: z.null(),
  });

  const { data } = await axios.post(
    `/picircle/likeshare/${id}?type=article&feature=like`,
    {}
  );
  return schema.parse(data);
};
export const usePostLike = () =>
  useMutation(["forum-usePostLike"], (id: string) => postForum(id));
