import { Icon } from "@iconify/react";
import { cn } from "../helper/utils";
import { useState } from "react";

export default function Pagination({
  className,
  disabled,
  page,
  onPrev,
  onNext,
  onSubmit,
}) {
  const [pageNow, setPageNow] = useState(page);

  return (
    <div
      className={cn(
        "bg-white rounded-md flex items-center overflow-hidden w-fit",
        className
      )}
    >
      <button
        className="w-[40px] hover:bg-gray-400 duration-150 aspect-square flex justify-center items-center cursor-pointer"
        disabled={disabled}
        onClick={() => {
          if (page > 1) onPrev && onPrev();
        }}
      >
        <Icon icon="tabler:chevron-left" height={25} />
      </button>
      <input
        className="border-x h-[40px] w-[60px] flex justify-center items-center text-center"
        type="number"
        value={pageNow}
        disabled={disabled}
        onInput={(e) => setPageNow(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter" || e.code === "Enter")
            onSubmit && onSubmit(pageNow);
        }}
      />
      <button
        className="w-[40px] hover:bg-gray-400 duration-150 aspect-square flex justify-center items-center cursor-pointer"
        disabled={disabled}
        onClick={() => onNext && onNext()}
      >
        <Icon icon="tabler:chevron-right" height={25} />
      </button>
    </div>
  );
}
