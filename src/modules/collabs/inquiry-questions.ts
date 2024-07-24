import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      question: z.string(),
      answers: z.array(z.object({ id: z.number(), answer: z.string() })),
    })
  ),
});

export const getInquiryQuestions = async () => {
  const { data } = await axios.get("/collabs/inquiry-questions");
  return schema.parse(data).data;
};

export const useInquiryQuestion = () =>
  useQuery(["collabs"], () => getInquiryQuestions());

useInquiryQuestion.prefetch = async (queryClient: QueryClient) =>
  await queryClient.prefetchQuery(["collabs"], () => getInquiryQuestions());
