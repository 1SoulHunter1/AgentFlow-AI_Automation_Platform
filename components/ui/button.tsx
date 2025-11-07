import type * as React from "react"
import { cn } from "@/lib/utils"

const variantStyles = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive: "bg-destructive text-white hover:bg-destructive/90",
  outline: "border bg-background shadow-sm hover:bg-accent",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
}

const sizeStyles = {
  default: "h-9 px-4 py-2",
  sm: "h-8 px-3 text-xs",
  lg: "h-10 px-6",
  icon: "h-9 w-9",
  "icon-sm": "h-8 w-8",
  "icon-lg": "h-10 w-10",
}

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: keyof typeof variantStyles
  size?: keyof typeof sizeStyles
}

function Button({ className, variant = "default", size = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    />
  )
}

export { Button }
