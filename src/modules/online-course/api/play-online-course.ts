import { useQuery } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const descriptionSchema = z.array(
  z.object({
    title: z.string(),
    description: z.string(),
  })
);

// Schema untuk data `section`
const sectionSchema = z.array(
  z.object({
    id: z.number(),
    online_course_id: z.number(),
    title: z.string(),
    from_duration: z.number(),
    to_duration: z.number(),
    description: z.string(),
  })
);

// Schema untuk `data`
const schema = z.object({
  id: z.number(),
  thumbnail_image: z.string(),
  cover_image: z.string().optional(), // Jika cover_image opsional
  thumbnail_video: z.string().optional(), // Bisa nullish
  title: z.string(),
  meta_title: z.string(),
  type: z.string(),
  video_url: z.string(),
  video_length: z.string().nullable(), // Bisa null
  duration: z.string(),
  description: descriptionSchema,
  section: sectionSchema,
  files: z.array(z.unknown()), // Bisa diganti jika ada informasi tentang tipe data files
});

// Schema untuk respons keseluruhan
const schemaData = z.object({
  status: z.string(),
  message: z.string(),
  data: schema.nullable(), // Jika data bisa kosong/null
  page: z.unknown().nullable(), // Bisa diganti jika ada tipe spesifik
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
