import React from 'react';

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

export const AuthFooter = ({ children }: { children?: any }) => {
  return <footer className={styles.footer}>{children}</footer>;
};
