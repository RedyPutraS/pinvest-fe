import { useQuery } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const schema = z.array(
  z.object({
    id: z.number(),
    thumbnail_image: z.string(),
    added_to_wishlist: z.boolean(),
    title: z.string(),
    // content: z.string(),
    type: z.string(),
    meta_title: z.string(),
    meta_description: z.string(),
    meta_keyword: z.string(),
    status: z.string(),
    author: z.string(),
    voucher: z.boolean(),
    price: z.number(),
    promo_price: z.number(),
    rate: z.number(),
    rating_count: z.number(),
    description: z.string(),
    duration: z.string(),
    instructor: z.object({
      id: z.number(),
      name: z.string(),
      title: z.string(),
      description: z.string(),
      image: z.string().nullish(),
    }),
  })
);

const schemaData = z.object({
  status: z.string(),
  message: z.string(),
  data: schema,
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

type Params = {
  start: number;
  page: string | null;
  limit: number;
  sort: string;
  filter: { type: "free" | "premium" | ""; rating: number };
  search: string;
  category: string;
};

export const getOnlineCourse = async ({
  page = "1",
  start,
  limit,
  sort,
  filter,
  search,
  category,
}: Params) => {
  const { data } = await axios.get(`/pilearning/online-course`, {
    params: {
      page,
      start,
      limit,
      sort,
      filter: encodeURI(JSON.stringify(filter)),
      search,
      category,
    },
  });

  return schemaData.parse(data);
};

// export const useOnlineCourse = (params: Params) =>
//   useQuery(["get-online-course-list", params], () => getOnlineCourse(params));

// useOnlineCourse.prefetch = async (queryClient: QueryClient, params: Params) =>
//   queryClient.prefetchQuery(["get-online-course-list", params], () =>
//     getOnlineCourse(params)
//   );

export const useOnlineCourse = (params: Params) =>
  useQuery(["get-online-course-list", params], () => getOnlineCourse(params));

useOnlineCourse.prefetch = async (queryClient: QueryClient, params: Params) =>
  queryClient.prefetchQuery(["get-online-course-list", params], () =>
    getOnlineCourse(params)
  );

export const getSortBy = (
  sortBy: string
): "new" | "title-asc" | "title-desc" | "popular" => {
  if (sortBy === "new") return "new";
  if (sortBy === "title-asc") return "title-asc";
  if (sortBy === "title-desc") return "title-desc";
  if (sortBy === "popular") return "popular";
  return "new";
};

export const getType = (type: string): "free" | "premium" | "" => {
  if (type === "free") return "free";
  if (type === "premium") return "premium";
  return "";
};
