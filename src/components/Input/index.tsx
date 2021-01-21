import styles from './style.module.scss';
import React,{InputHTMLAttributes} from "react";

type Props={
}&InputHTMLAttributes<HTMLInputElement>

export type Ref=HTMLInputElement

export const Input=React.forwardRef<Ref,Props>(({...props},ref)=>{

    return(
        <input {...props} ref={ref} className={styles.input}/>
    )
}
)