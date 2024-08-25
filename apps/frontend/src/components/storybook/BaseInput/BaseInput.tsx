import React, { forwardRef } from 'react';
import { Input, InputProps } from '@chakra-ui/react';

interface BaseInputProps extends InputProps {
  label: string;
}

const BaseInput: React.FC<BaseInputProps> = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ label, ...props }, ref) => {
    return (
      <>
        <label>{label}</label>
        <Input {...props} ref={ref} />
      </>
    );
  },
);

export default BaseInput;
