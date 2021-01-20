import styles from "./style.module.scss";
import {Checkmark} from "../../assets/icons/Checkmark";


type Props={
    checked:boolean;
    onClick:()=>React.MouseEventHandler<HTMLInputElement>|any;
}

export const Checkbox: React.FC<Props> = ({
  children,
  onClick,
  checked=false
}) => {
  return (
    <div className={styles.wrapper}>
      <input type="checkbox" className={styles.checkbox__hidden}
        aria-checked={checked}
      />
      <span role="checkbox" aria-checked={checked}
        onClick={onClick}
        className={`${styles.checkbox} ${checked?styles.checked:styles.unchecked}`}>{checked&&<Checkmark />}</span>
      <label className={styles.label}>{children}</label>
    </div>
  );
};
