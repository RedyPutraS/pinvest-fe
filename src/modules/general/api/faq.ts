import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";

export interface Root {
  status: string
  message: string
  data: Faq[]
}

export interface Faq {
  id: number
  title: string
  content: string
  status: string
  category: string
  order_number: number
}


export const faqSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  status: z.string(),
  category: z.string(),
  order_number: z.number()
})

export const rootSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(faqSchema)
})


export interface FaqParams{
  category:string
}

export const getFaq = async ({category}:FaqParams)=>{
  const {data} = await axios.get("/faq/general",{
    params:{category}
  })
  return rootSchema.parse(data).data
}

export const useFaq = (params:FaqParams)=>useQuery(["faq", params],()=>getFaq(params))

useFaq.prefetch = async(queryClient:QueryClient, params:FaqParams)=>await queryClient.prefetchQuery(["faq",params], ()=>getFaq(params))