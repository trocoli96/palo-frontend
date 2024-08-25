import React from 'react';
import { FieldValues, useForm, SubmitHandler, FormState } from 'react-hook-form';

interface UseFormFieldsReturn {
  handleSubmit: (onSubmit: SubmitHandler<FieldValues>) => (e: React.FormEvent) => Promise<void>;
  fields: Record<string, any>;
  formState: FormState<any>;
}

export function useFormFields(
  fieldsConfig: { name: string; rules: Record<string, any> }[],
): UseFormFieldsReturn {
  const { handleSubmit: originalHandleSubmit, register, formState } = useForm();

  const fields: Record<string, any> = {};

  fieldsConfig.forEach(({ name, rules }) => {
    fields[name] = register(name, rules);
  });

  const handleSubmit = (onSubmit: SubmitHandler<FieldValues>) => {
    return originalHandleSubmit(onSubmit);
  };

  return { handleSubmit, fields, formState };
}
