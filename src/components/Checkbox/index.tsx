import styles from "./style.module.scss";
import {Checkmark} from "../../assets/icons/Checkmark";
import  React, { MouseEvent } from "react";


type Props={
    checked:boolean;
}&React.HtmlHTMLAttributes<HTMLElement>

export const Checkbox: React.FC<Props> = ({
  children,
  onClick,
  checked=false
}) => {

  const ref=React.useRef<any>();

const handleClick=()=>{
   if(ref.current){
     ref.current.click();
   }
}

const handleInputClick=(e:MouseEvent<HTMLInputElement>)=>{
  if(onClick){
    onClick(e);
  }
}
  return (
    <div className={styles.wrapper}>
      <input onClick={handleInputClick}  ref={ref} type="checkbox" className={styles.checkbox__hidden}
        aria-checked={checked}
      />
      <span role="checkbox" onClick={handleClick}  aria-checked={checked}
        
        className={`${styles.checkbox} ${checked?styles.checked:styles.unchecked}`}>{checked&&<Checkmark />}</span>
      <label className={styles.label}>{children}</label>
    </div>
  );
};
