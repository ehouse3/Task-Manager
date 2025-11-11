import { ChangeEvent, ReactElement } from "react";
import Link from "next/link";

interface ButtonProps {
  onClick?: () => void;
  innerText?: string;
  type?: "button" | "submit" | "reset";
}
/** Button Component that displays a button with callback function for press. */
export function Button(props: ButtonProps): ReactElement {
  return (
    <button
      className="mx-1 mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={props.onClick}
      type={props.type}
    >
      {props.innerText ?? ""}
    </button>
  );
}

interface NavigateProps {
  href: string;
  innerText?: string;
}
/** Navigate Component to direct to new page */
export function Navigate(props: NavigateProps): ReactElement {
  return (
    <Link
      className="mx-1 mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      href={props.href}
    >
      {props.innerText ?? ""}
    </Link>
  );
}

interface TextFieldProps {
  placeHolder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}
/** Input Field to input text */
export function TextField(props: TextFieldProps): ReactElement {
  return (
    <input
      className="mx-1 mb-4 px-2 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
      placeholder={props.placeHolder}
      onChange={props.onChange}
      required={props.required}
      minLength={props.minLength}
      maxLength={props.maxLength}
      type="text"
    ></input>
  );
}

interface PasswordFieldProps {
  placeHolder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}
/** Input Field to input passwords */
export function PasswordField(props: PasswordFieldProps): ReactElement {
  return (
    <input
      className="mx-1 mb-4 px-2 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
      placeholder={props.placeHolder}
      onChange={props.onChange}
      required={props.required}
      minLength={props.minLength}
      maxLength={props.maxLength}
      type="password"
    ></input>
  );
}
