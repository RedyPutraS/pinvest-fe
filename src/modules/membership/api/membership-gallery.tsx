import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export const durationSchema = z.object({
  id: z.number(),
  image: z.string(),
});

export const dataSchema = z.array(
  z.object({
    id: z.number(),
    image: z.string(),
  })
);

export const rootSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: dataSchema,
});

interface Params {
  id: string;
}

export const getMembershipGallery = async ({ id }: Params) => {
  const { data } = await axios.get(`/membership-gallery/${id}`);
  return rootSchema.parse(data).data;
};

export const useMembershipGallery = (params: Params) =>
  useQuery(["membership-gallery", params], () => getMembershipGallery(params));

useMembershipGallery.prefetch = async (
  queryClient: QueryClient,
  params: Params
) =>
  await queryClient.prefetchQuery(["membership-gallery"], () =>
    getMembershipGallery(params)
  );
