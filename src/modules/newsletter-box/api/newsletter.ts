import { useMutation } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const newsletterSchema = z.object({
  status: z.string(),
  message: z.string(),
});

export const newsletterBodySchema = z.object({
  email: z.string(),
});

export type newsletterBodyType = z.infer<typeof newsletterBodySchema>;

export const postNewsletter = async (body: newsletterBodyType) => {
  const { data } = await axios.post(`/subscribe-newsletter`, {
    email: body.email,
  });

  return newsletterSchema.parse(data);
};

export const useNewsletter = () =>
  useMutation(["newsletter"], (body: newsletterBodyType) =>
    postNewsletter(body)
  );
