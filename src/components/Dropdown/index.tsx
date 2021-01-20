import React, { useRef,useEffect,useState, RefObject } from "react";
import { ArrowDown } from "../../assets/icons/ArrowDown";
import styles from "./style.module.scss";

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-a-dropdown-menu-component-with-react-hooks
 */

export type Option={label:string,value:any};


type Props={
  value?:string|any;
  options?:Array<Option>|null
  placeholder?:string;
  onChange?:(option:Option)=>void
}

export const Dropdown:React.FC<Props>=({...props})=>{
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [selected,setSelected] = React.useState<Option|null>(props.value);

  
  const callBack=(option:Option)=>{return props.onChange?props.onChange(option):option;}

  const onSelect=(option:Option)=>{
    setSelected(option);
    setIsActive(false);
    callBack(option);
  }


  const onClick = (e:React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsActive(!isActive);
  }
  return (
    <div className={styles.container} >
      <div className={styles.menu__container}>
        <button onClick={onClick} className={`${styles.menu__trigger} ${isActive||selected? styles.menu__trigger__active:''}`}>
          <span>{selected?.label??props.placeholder??"Select..."}</span>
          <ArrowDown/>
        </button>
        <div
          ref={dropdownRef}
          className={`${styles.menu} ${isActive ? styles.active : styles.inactive}`}
        >
          <ul>{props?.options?.map(option=>(
            <li onClick={()=>{onSelect(option)}}>
              <span>{option.label}</span>
            </li>
          ))}
            
          </ul>
        </div>
      </div>
    </div>
  );
}


/**
 * Hook for handling closing when clicking outside of an element
 * @param {React.node} el
 * @param {boolean} initialState
 */
export const useDetectOutsideClick = (el:RefObject<HTMLElement>, initialState:boolean) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = (e:Event&{target:globalThis.Node}) => {
      // If the active element exists and is clicked outside of
      if (el.current !== null && !el.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };

    // If the item is active (ie open) then listen for clicks outside
    if (isActive) {
      window.addEventListener("click", onClick as any);
    }

    return () => {
      window.removeEventListener("click", onClick as any);
    };
  }, [isActive, el]);

  return [isActive, setIsActive] as const;
};
