import { ComponentProps, forwardRef } from "react";

type ButtonProps = ComponentProps<"button"> & {
  className?: string;
  variant?: "contained" | "outline" | "text";
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type, className, children, variant = "contained", onClick }, ref) => {
    if (variant == "contained") {
      return (
        <button
          type={type}
          ref={ref}
          onClick={onClick}
          className={`bg-secondary-500 text-white text-[12px] p-2 rounded-[8px] ${className}`}
        >
          {children}
        </button>
      );
    }
  }
);

export default Button;
