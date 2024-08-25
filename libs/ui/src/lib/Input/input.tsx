import React, { useState, InputHTMLAttributes, ReactNode, KeyboardEvent } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

import { cn } from 'utils';

import { Text } from '../Text';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  label?: string;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  ghost?: boolean;
  onEnter?: (value: string) => void; // Callback for the Enter key
  delegateState?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, iconLeft, iconRight, label, error, delegateState, ghost, onEnter, ...props },
    ref,
  ) => {
    const [value, setValue] = useState(props.value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      props.onChange?.(e);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && value) {
        onEnter?.(value.toString()); // Ensure value is a string
      }
    };

    return (
      <span className="w-full flex justify-center flex-col">
        {label && (
          <label className="self-start font-bold">
            <Text className="mb-2">{label}</Text>
          </label>
        )}
        <div
          className={cn(
            `flex h-10 items-center rounded-lg transition-all w-full ${
              ghost && 'hover:border hover:border-input'
            } ${ghost ? '' : 'border shadow-sm '} ${
              error ? 'border-destructive' : ghost ? '' : 'border-input'
            } bg-background text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2`,
            className,
          )}
        >
          {iconLeft}
          <input
            {...props}
            ref={ref} // Set the ref
            value={delegateState ? props.value : value}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            className="bg-transparent w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
          {iconRight}
        </div>
        {error && (
          <span>
            <Text size="xs" className="text-destructive">
              {error?.toString()}
            </Text>
          </span>
        )}
      </span>
    );
  },
);
