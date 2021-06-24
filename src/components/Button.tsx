import { ButtonHTMLAttributes } from "react";

import "../styles/button.scss";

type ButtonProperties = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }: ButtonProperties){
  return(
    <button 
      className={`button ${isOutlined && 'outlined'}`} 
      {...props}
    />
  );
};