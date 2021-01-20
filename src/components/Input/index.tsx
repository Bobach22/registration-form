import styles from './style.module.scss';
import React from "react";

type Props={
    name?:string;
    id?:string;
    onChange?:()=>void|undefined
    value?:any
    placeholder?:string;
    type?:"text"|"number"|"checkbox"|"radio"|"submit"|any
}

export type Ref=HTMLInputElement

export const Input=React.forwardRef<Ref,Props>(({...props},ref)=>{

    return(
        <input {...props} ref={ref} className={styles.input}/>
    )
}
)