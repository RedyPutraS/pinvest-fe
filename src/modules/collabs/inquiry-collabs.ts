import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "hooks/use-auth-store";
import type { InquiryBodyType } from "modules/pi-capital/api/inquiry";
import { axios } from "utils";
import { z } from "zod";

const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.any().nullish(),
});

export const postCollabsInquiry = async (body: InquiryBodyType) => {
  const token = useAuthStore.getState().user;
  const formData = new FormData();
  formData.append("file[]", body.file);
  formData.append("app", body.app);
  formData.append("notes", body.notes);
  formData.append("answers", JSON.stringify(body.answer));
  const { data } = await axios.post(`/collabs/create-inquiry`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return schema.parse(data).data;
};

export const useCollabsInquiryMutation = () =>
  useMutation(["inquiry-collabs"], (body: InquiryBodyType) =>
    postCollabsInquiry(body)
  );
