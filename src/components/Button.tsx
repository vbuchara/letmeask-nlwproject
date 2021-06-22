import { ButtonHTMLAttributes } from "react";

import "../styles/button.scss";

type ButtonProperties = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProperties){
  return(
    <button className="button" {...props}/>
  );
};