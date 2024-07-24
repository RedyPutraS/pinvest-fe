import { useMutation } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const verifyOtpSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({ token: z.string() }),
});

export const verifyOtpBodySchema = z.object({
  otp: z.string(),
});

export type VerifyOtpBody = z.infer<typeof verifyOtpBodySchema>;

export const verifyOtp = async (body: VerifyOtpBody) => {
  const { data } = await axios.post(`/auth/login-google/verify-otp`, body);
  return verifyOtpSchema.parse(data).data;
};

export const useVerifyOtp = () =>
  useMutation(["verify-otp"], (body: VerifyOtpBody) => verifyOtp(body));
