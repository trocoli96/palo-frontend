import React, { HTMLAttributes, forwardRef } from 'react';

import { motion, MotionProps } from 'framer-motion';

const animationVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  fadeRightIn: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  },
  fadeLeftIn: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  },
};

interface FlexProps extends MotionProps {
  className?: string;
  onClick?: (e: any) => void;
  animationTemplate?: keyof typeof animationVariants;
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ children, className, onClick, animationTemplate, ...rest }, ref) => {
    const chosenVariant = animationTemplate ? animationVariants[animationTemplate] : {};

    return (
      <motion.div
        onClick={onClick}
        ref={ref}
        className={`flex ${className || ''}`}
        {...rest}
        variants={chosenVariant}
        initial="initial"
        animate="animate"
        exit="exit"
        {...rest}
      >
        {children}
      </motion.div>
    );
  },
);

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  style?: any;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ children, className, style, ...rest }, ref) => {
    return (
      <div style={style} ref={ref} className={`box ${className || ''}`} {...rest}>
        {children}
      </div>
    );
  },
);
