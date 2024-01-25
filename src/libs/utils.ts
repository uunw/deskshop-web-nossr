import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const apiUrl =
  "https://waraporn.cmtc.ac.th/student/student65/u65301280011/IKEA-DeskShop/api/";
