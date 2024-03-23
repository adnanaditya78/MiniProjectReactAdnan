import { Icon } from "@iconify/react";
import { cn } from "../helper/utils";
import { useState } from "react";

export default function AlertBar({ className, children, open = false }) {
  const [status, setStatus] = useState(open);

  if (status)
    return (
      <div
        className={cn(
          "bg-red-100 rounded-md px-3 py-2 flex items-center justify-between gap-3",
          className
        )}
      >
        <p className="text-sm">{children}</p>
        <Icon
          icon="fa-solid:times"
          height={15}
          className="text-red-500 cursor-pointer"
          onClick={() => setStatus(false)}
        />
      </div>
    );
}
