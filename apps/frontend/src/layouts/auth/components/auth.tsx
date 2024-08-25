import React, { FormEvent } from 'react';

export const AuthLayout = ({ children }: { children?: any }) => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col justify-center w-1/3 bg-white p-2 rounded-md">
        {children}
      </div>
    </div>
  );
};

export const AuthHeader = ({ children }: { children?: any }) => {
  return <header className="flex flex-col gap-4 p-4">{children}</header>;
};

export const AuthTitle = ({ children }: { children?: any }) => {
  return <h3 className="text-3xl font-extrabold">{children}</h3>;
};

export const AuthSubtitle = ({ children }: { children?: any }) => {
  return <p className="text-sm text-muted-foreground">{children}</p>;
};

export const AuthContent = ({ children }: { children?: any }) => {
  return <div className="flex flex-col gap-8 p-4">{children}</div>;
};

export const AuthFormContent = ({
                                  children,
                                  onSubmit,
                                }: {
  children?: any;
  onSubmit: (e: FormEvent<Element>) => Promise<void>;
}) => {
  return (
    <form className="flex flex-col justify-center p-4 gap-8 w-full" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export const AuthFooter = ({ children }: { children?: any }) => {
  return <footer className="p-4">{children}</footer>;
};
