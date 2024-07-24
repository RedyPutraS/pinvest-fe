import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

const schema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      subcategory_name: z.string(),
      alias: z.string(),
    })
  ),
});

interface Params {
  categoryId: string;
}

const getPiCircleSubCategory = async ({ categoryId }: Params) => {
  const { data } = await axios.get(`/subcategory/by-category/${categoryId}`);
  return schema.parse(data).data;
};

export const usePiCircleSubCategory = (params: Params) =>
  useQuery(["piCircleSubCategory", params], () =>
    getPiCircleSubCategory(params)
  );
