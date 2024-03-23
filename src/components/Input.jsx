import { cn } from "../helper/utils";

export default function Input({ className, ...props }) {
  return <input className={cn("border rounded-md py-2 px-3", className)} {...props} />;
}
