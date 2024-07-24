import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axios } from "utils";
import { z } from "zod";
export interface Root {
  status: string
  message: string
  data: AboutUs
}

export interface AboutUs {
  id: number
  title: string
  content: string
  status: string
  category: string
  order_number?: number
  image?: string
}


export const dataSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  status: z.string(),
  category: z.string(),
  order_number: z.number().nullish(),
  image:z.string().nullish()
})

export const rootSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: dataSchema
})

export interface AboutUsParams{
  category:string
}

export const getAboutUs = async ({category}:AboutUsParams)=>{
  const {data} = await axios.get("/faq/general",{
    params:{category}
  })
  return rootSchema.parse(data).data
}

export const useAboutUs = (params:AboutUsParams)=>useQuery(["about-us", params],()=>getAboutUs(params))

useAboutUs.prefetch = async(queryClient:QueryClient, params:AboutUsParams)=>await queryClient.prefetchQuery(["about-us",params], ()=>getAboutUs(params))