import React from "react";
import style from "./style.module.scss";

export const Form:React.FC<any>=({children,...props})=>{

    return(
        <form className={style.form} {...props}>
            {children}
        </form>
    )
}