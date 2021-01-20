import styles from './style.module.scss'
import React from "react";


export const FormFields:React.FC<any> = ({ children }) => {
  return (
    <div className={styles.form__field}>
      {children}
    </div>
  );
};

export const FormLabel:React.FC<any> = ({ children,...props }) => {
  return <label className={styles.label} {...props}>{children}</label>;
};

export const FormTitle:React.FC<any> = ({ children,...props }) => {
  return <h3 className={styles.title} {...props}>{children}</h3>;
};

export const FormError:React.FC<any> = ({ children,...props }) => {
  return <span className={styles.error} {...props}>{children}</span>;
};

