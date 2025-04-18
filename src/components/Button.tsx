import { cn } from "@/utils/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva("", {
  variants: {
    variant: {
      default: "text-white bg-primary p-3 rounded-lg",
      secondary: "text-secondary p-3 rounded-lg",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {text: string};

export const Button: React.FC<ButtonProps> = ({
  variant,
  className,
  text,
  ...props
}) => {
  return (
    <button className={cn(buttonVariants({ variant }), className)}>
      {text}
    </button>
  );
};
