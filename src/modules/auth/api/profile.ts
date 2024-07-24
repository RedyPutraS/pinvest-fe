import { useMutation } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const profileSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    firstName: z.string().nullish(),
    lastName: z.string().nullish(),
    email: z.string().nullish(),
    phone: z.string().nullish(),
    profile_picture: z.string().nullish(),
    birthdate: z.string().nullish(),
    gender: z.string().nullish(),
  }),
});

const profilePictSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      profile_picture: z.any(),
    })
  ),
});
export const profilePictBodySchema = z.object({
  profile_picture: z.any(),
});
export type profilePictBodyType = z.infer<typeof profilePictBodySchema>;

export const postProfilePict = async (body: profilePictBodyType) => {
  const formData = new FormData();
  formData.append("profile_picture", body.profile_picture);
  const { data } = await axios.post(
    `/account/change-profile-picture`,
    formData
  );

  return profilePictSchema.parse(data).data;
};
export const useProfilePict = () =>
  useMutation(["profile_picture"], (body: profilePictBodyType) =>
    postProfilePict(body)
  );

export const profileBodySchema = z.object({
  firstName: z.string().min(3, "Minimal 3 karakter"),
  lastName: z.string().min(3, "Minimal 3 karakter"),
  email: z.string().email(),
  phone: z.string().min(3, "Tidak valid"),
  birthdate: z.string(),
  gender: z.string(),
});

export type profileBodyType = z.infer<typeof profileBodySchema>;

export const postProfile = async (body: profileBodyType) => {
  const { data } = await axios.post(`/account/change-profile`, {
    first_name: body.firstName,
    last_name: body.lastName,
    email: body.email,
    no_hp: body.phone,
    birth_date: body.birthdate,
    gender: body.gender,
  });
  return profileSchema.parse(data).data;
};

export const useProfile = () =>
  useMutation(["profile"], (body: profileBodyType) => postProfile(body));

const passwordSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      password: z.string(),
      new_password: z.string(),
      confirm_new_password: z.string(),
    })
  ),
});

export const passwordBodySchema = z
  .object({
    password: z.string().min(8, "Minimal 8 karakter"),
    new_password: z.string().min(8, "Minimal 8 karakter"),
    confirm_new_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "Password baru tidak sama",
    path: ["confirm_new_password"],
  });

export type passwordBodyType = z.infer<typeof passwordBodySchema>;

export const postPassword = async (body: passwordBodyType) => {
  const { data } = await axios.post(`/account/change-password`, {
    password: body.password,
    new_password: body.new_password,
    confirm_new_password: body.confirm_new_password,
  });

  return passwordSchema.parse(data);
};

export const usePassword = () =>
  useMutation(["password"], (body: passwordBodyType) => postPassword(body));
