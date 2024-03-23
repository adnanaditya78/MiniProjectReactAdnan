import { twMerge } from "tailwind-merge";

export function cn(...classNames) {
  return twMerge(classNames);
}
