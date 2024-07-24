/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "hooks/use-auth-store";
import { axios } from "utils";
import { z } from "zod";

const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.any().nullish(),
});

export const postForum = async (body: any) => {
  const token = useAuthStore.getState().user;
  const formData = new FormData();
  formData.append("cover_image", body.cover_image);
  formData.append("thumbnail_image", body.thumbnail_image);
  formData.append("title", body.title);
  formData.append("meta_description", body.title);
  formData.append("meta_keyword", body.title);
  formData.append("description", body.description);
  formData.append("content", body.content);
  formData.append("sub_category", body.sub_category);
  formData.append("subcategory", body.sub_category);
  formData.append("kategori_lainnya", body.kategori_lainnya);
  const { data } = await axios.post(`/picircle/create-article`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return schema.parse(data).data;
};

export const useForumPostMutation = () =>
  useMutation(["forum-post"], (body: any) => postForum(body));
