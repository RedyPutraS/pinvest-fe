import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "hooks/use-auth-store";
import { axios } from "utils";
import { z } from "zod";

const inquirySchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    files: z.array(z.unknown()),
    question_answered: z.number().optional().nullable(),
  }),
});

const inquiryBodySchema = z.object({
  notes: z.string(),
  file: z.any(),
  article_id: z.string().nullish(),
  app: z.string(),
  answer: z.array(z.any()).nullish(),
  is_collabs: z.boolean().nullish(),
});

export type InquiryBodyType = z.infer<typeof inquiryBodySchema>;

export const postInquiry = async (body: InquiryBodyType) => {
  const token = useAuthStore.getState().user;
  const formData = new FormData();
  formData.append("file[]", body.file);
  formData.append("app", body.app);
  formData.append("notes", body.notes);
  formData.append("article_id", body.article_id ?? "");

  const { data } = await axios.post(`/inquiry`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return inquirySchema.parse(data).data;
};

export const useInquiryMutation = () =>
  useMutation(["inquiry"], (body: InquiryBodyType) => postInquiry(body));
