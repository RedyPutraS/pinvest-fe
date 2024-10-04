import { useMutation } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const registerSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({ email: z.string() }),
});

export const registerBodySchema = z.object({
  firstName: z.string().min(2, "Minimal 2 karakter"),
  lastName: z.string(),
  email: z.string().refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
    message: "Email tidak valid",
  }),
  password: z.string().min(8, "Minimal 8 karakter/numerik"),
  confirm_password: z.string().min(8, "Minimal 8 karakter/numerik"),
  phone: z.string().min(11, "Tidak valid"),
  birthdate: z.string(),
  gender: z.string(),
  kota_id: z.number(),
});

export type RegisterBodyType = z.infer<typeof registerBodySchema>;

export const postRegister = async (body: RegisterBodyType) => {
  const { data } = await axios.post(`/auth/register`, {
    first_name: body.firstName,
    last_name: body.lastName,
    email: body.email,
    password: body.password,
    confirm_password: body.confirm_password,
    no_hp: body.phone,
    birth_date: body.birthdate,
    gender: body.gender,
    job_name: body.gender,
    kota_id: body.kota_id,
  });

  return registerSchema.parse(data).data;
};

export const useRegister = () =>
  useMutation(["register"], (body: RegisterBodyType) => postRegister(body));
