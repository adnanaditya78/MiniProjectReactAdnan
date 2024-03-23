import { cn } from "../helper/utils";

export default function Container({ className, children }) {
  return <div className={cn("mx-auto xl:max-w-[1100px] lg:max-w-[900px] md:max-w-[650px] px-5", className)}>{children}</div>;
}
