import { ReactElement } from "react";


interface ButtonProps {
  onClick?: () => void;
  buttonText?: string;
  type?: "button" | "submit" | "reset";
}
/** Button Component that displays a button with callback function for press. */
export function Button(props: ButtonProps): ReactElement {
  return (
    <button
      className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={props.onClick}
      type={props.type}
    >
      {props.buttonText}
    </button>
  );
}