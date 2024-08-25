import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import {cn} from "utils";


const buttonVariants = cva(
  "inline-flex gap-2 items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "rounded-xl bg-primary border border-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90",
        ghostDestructive:
          "rounded-lg text-destructive hover:bg-red-100",
        outline:
          "rounded-lg border border-primary text-primary bg-background hover:bg-accent",
        secondary:
          "rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "rounded-lg hover:bg-accent hover:text-accent-foreground",
        link: "rounded-lg text-primary underline-offset-4 hover:underline",
        canva: "text-white bg-gradient-to-r from-canvaLight from-8% to-canvaDark to-98% hover:opacity-90",
      },
      size: {
        default: "py-2.5 px-4",
        sm: "h-8 px-4 py-1.5",
        lg: "h-10 rounded-md px-8",
        icon: "h-8 w-10",
        iconSm: "h-4 w-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
