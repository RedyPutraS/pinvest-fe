import type { QueryClient } from "@tanstack/react-query";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      transaction_id: z.number(),
      order_id: z.string(),
      title: z.string(),
      content: z.string(),
      is_read: z.boolean(),
      created_at: z.string(),
      payment_progress: z.string(),
    })
  ),
});

export interface NotificationParams {
  page?: number;
  limit?: number;
  filter?: string;
  sort?: string;
}
export const getNotifications = async ({
  page = 1,
  limit = 5,
  filter = "all",
  sort = "desc",
}: NotificationParams) => {
  const start = (page - 1) * limit;
  const { data } = await axios.get("/notification/all", {
    params: { limit, start, filter, sort },
  });
  return schema.parse(data).data;
};

export const useNotifications = (params: NotificationParams) =>
  useQuery(["notification-list"], () => getNotifications(params), {
    enabled: false,
  });

useNotifications.prefetch = async (
  queryClient: QueryClient,
  params: NotificationParams
) =>
  await queryClient.prefetchQuery(["notification-list", params], () =>
    getNotifications(params)
  );

export const useInfiniteNotifications = (params: NotificationParams) =>
  useInfiniteQuery({
    queryKey: ["use-infinite-notification", params],
    queryFn: ({ pageParam = 1 }) =>
      getNotifications({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.length === params.limit ? pages.length + 1 : undefined,
  });

type PostBody = {
  notification_id: number;
};
export const postNotification = async (body: PostBody) => {
  const { data } = await axios.post(`/notification/read`, body);
  return schema.parse(data).data;
};

export const usePostNotification = () =>
  useMutation(["post-notification"], (body: PostBody) =>
    postNotification(body)
  );
