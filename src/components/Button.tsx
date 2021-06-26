import className from 'classnames';
import { ButtonHTMLAttributes } from "react";

import "../styles/button.scss";

type ButtonProperties = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
  homeButton?: boolean;
};

export function Button({ isOutlined = false, homeButton = false, ...props }: ButtonProperties){
  return(
    <button 
      className={className(
        'button',
        { outlined: isOutlined },
        { homeButton: homeButton }
      )} 
      {...props}
    />
  );
};