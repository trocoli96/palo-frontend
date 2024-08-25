import * as React from 'react';

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "utils";
const textVariants = cva();

export type SizeOptions = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';

export const sizes = {
  xxs: '11px',
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "18px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "28px",
  "4xl": "36px",
  "5xl": "48px",
  "6xl": "64px",
}

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof textVariants> {
  size?: SizeOptions;
  onClick?: () => void;
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(({ className, size, onClick, children }: TextProps, ref) => {
  const textSize = size ? sizes[size] : undefined;
  const style = { fontSize: textSize };

  return <p onClick={onClick} className={cn(`${onClick ? 'hover:underline cursor-pointer' : ''}`, textVariants({ className }))} style={style} ref={ref}>{children}</p>;
});

Text.defaultProps = {
  size: 'md'
}
