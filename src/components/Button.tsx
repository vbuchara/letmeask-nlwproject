type ButtonProps = {
  text?: String;
  children?: string;
};

export function Button(props: ButtonProps){
  return(
    <button>{props.text || props.children || "Default"}</button>
  );
};