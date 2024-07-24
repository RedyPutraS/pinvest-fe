import { useMutation } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const loginSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({ id: z.number(), token: z.string() }),
});

export const loginBodySchema = z.object({
  email: z.string().email("Email Tidak Valid"),
  password: z.string().min(8, "Kata Sandi Salah"),
});

export type LoginBodyType = z.infer<typeof loginBodySchema>;

export const postLogin = async (body: LoginBodyType) => {
  const { data } = await axios.post(`/auth/login`, body);
  return loginSchema.parse(data).data;
};

export const useLogin = () =>
  useMutation(["login"], (body: LoginBodyType) => postLogin(body));
