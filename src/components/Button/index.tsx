import styles from './style.module.scss'
import React from 'react';

type ButtonProps= React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button:React.FC<ButtonProps>=({children,...props})=>{

    return( 
        <button {...props} className={styles.button}>
            {children}
        </button>
     )
}