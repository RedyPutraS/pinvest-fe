import { useMutation } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const forgotSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.any().nullish(),
});

export const forgotBodySchema = z.object({
  email: z.string().email(),
});

export type ForgotBodyType = z.infer<typeof forgotBodySchema>;

export const postForgot = async (body: ForgotBodyType) => {
  const formData = new FormData();
  formData.append("email", body.email);
  const { data } = await axios.post(`/auth/forgot-password/request`, formData);

  return forgotSchema.parse(data);
};

export const useForgot = () =>
  useMutation(["forgot"], (body: ForgotBodyType) => postForgot(body));
