import clsx from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}

export default cn;
