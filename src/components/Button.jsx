import { Link } from "react-router-dom";
import { cn } from "../helper/utils";

export default function Button({
  children,
  to,
  variant = "primary",
  loading = false,
  disabled,
  className,
  ...props
}) {
  const variants = {
    primary:
      "min-w-[100px] text-center border rounded-md border-blue-500 bg-blue-500 hover:border-blue-600 hover:bg-blue-600 duration-150 text-white px-3 py-2 font-bold",
    "primary-outlined":
      "min-w-[100px] text-center border rounded-md border-blue-500 text-blue-500 hover:border-blue-600 hover:bg-blue-600 duration-150 hover:text-white px-3 py-2 font-bold",
    secondary:
      "min-w-[100px] text-center border rounded-md border-gray-500 bg-gray-500 hover:border-gray-600 hover:bg-gray-600 duration-150 text-white px-3 py-2 font-bold",
  };

  if (to) {
    return (
      <Link className={cn(variants[variant], className)} to={to} {...props}>
        {children}
      </Link>
    );
  } else {
    return (
      <button
        className={cn(variants[variant], className)}
        {...props}
        disabled={loading || disabled}
      >
        {loading ? "Loading" : children}
      </button>
    );
  }
}
