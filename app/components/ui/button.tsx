// components/ui/button.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        outline:
          "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-sm",
      },
      pill: {
        true: "rounded-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      pill: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, pill, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, pill }), className)}
      {...props}
    />
  )
);

Button.displayName = "Button";
