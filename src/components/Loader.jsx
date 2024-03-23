import { Icon } from "@iconify/react";

export default function Loader({ height = 500 }) {
  return (
    <div
      className="flex justify-center items-center flex-col"
      style={{ height }}
    >
      <Icon
        icon="line-md:loading-loop"
        height={80}
        className="mb-5 text-gray-600"
      />
      <p className="text-2xl font-semibold text-gray-500 mb-2">Loading</p>
    </div>
  );
}
