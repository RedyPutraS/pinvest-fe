import { useMutation } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const newPasswordSchema = z.object({
  status: z.string(),
  message: z.string(),
});

export const newPasswordBodySchema = z.object({
  token: z.string(),
  new_password: z.string(),
  confirm_new_password: z.string(),
});

export type NewPasswordBodyType = z.infer<typeof newPasswordBodySchema>;

export const postNewPassword = async (body: NewPasswordBodyType) => {
  const { data } = await axios.post(`/auth/forgot-password/submit`, body);
  return newPasswordSchema.parse(data);
};

export const useNewPassword = () =>
  useMutation(["password"], (body: NewPasswordBodyType) =>
    postNewPassword(body)
  );
