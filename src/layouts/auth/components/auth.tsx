import React, { FormEvent } from 'react';

import styles from '../styles/authLayout.module.css';

export const AuthLayout = ({ children }: { children?: any }) => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>{children}</div>
    </div>
  );
};

export const AuthHeader = ({ children }: { children?: any }) => {
  return <header className={styles.header}>{children}</header>;
};

export const AuthTitle = ({ children }: { children?: any }) => {
  return <h3 className={styles.title}>{children}</h3>;
};

export const AuthContent = ({ children }: { children?: any }) => {
  return <div className={styles.content}>{children}</div>;
};

export const AuthFormContent = ({
  children,
  onSubmit,
}: {
  children?: any;
  onSubmit: (e: FormEvent<Element>) => Promise<void>;
}) => {
  return (
    <form className={styles.form_container} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export const AuthFooter = ({ children }: { children?: any }) => {
  return <footer className={styles.footer}>{children}</footer>;
};
