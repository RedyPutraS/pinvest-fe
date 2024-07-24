import { useQuery } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const schema = z.object({
  id: z.number(),
  thumbnail_image: z.string(),
  thumbnail_video: z.string().nullish(),
  title: z.string(),
  // content: z.string(),
  meta_title: z.string(),
  type: z.string(),
  description: z.array(
    z.object({ title: z.string(), description: z.string() })
  ),
  video_url: z.string(),
  video_length: z.string(),
  duration: z.string(),
  section: z.array(
    z.object({
      id: z.number(),
      online_course_id: z.number(),
      title: z.string(),
      from_duration: z.number(),
      to_duration: z.number(),
      description: z.string(),
    })
  ),
});

const schemaData = z.object({
  status: z.string(),
  message: z.string(),
  data: schema,
});

type Params = {
  id: string;
};

export const getPlayOnlineCourse = async ({ id }: Params) => {
  const { data } = await axios.get(`/pilearning/online-course/play/${id}`, {});
  return schemaData.parse(data).data;
};

export const usePlayOnlineCourse = (params: Params) =>
  useQuery(["get-online-course-list", params], () =>
    getPlayOnlineCourse(params)
  );

usePlayOnlineCourse.prefetch = async (
  queryClient: QueryClient,
  params: Params
) =>
  queryClient.prefetchQuery(["get-online-course-list", params], () =>
    getPlayOnlineCourse(params)
  );
