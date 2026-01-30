import { ChangeEvent, ReactNode } from "react";
import Link from "next/link";

// Variants for core components like Buttons, Navigation buttons
const Variants = {
  bare: "bare",
  small: "small",
  medium: "medium",
  large: "large",
} as const;
type Variant = (typeof Variants)[keyof typeof Variants];

const ButtonTypes = {
  button: "button",
  submit: "submit",
  reset: "reset",
} as const;
type ButtonType = (typeof ButtonTypes)[keyof typeof ButtonTypes];

interface ButtonProps {
  onClick?: () => void;
  children?: ReactNode;
  variant?: Variant;
  type?: ButtonType;
}
/** Button Component that displays a button with callback function for press. */
export function Button(props: ButtonProps): ReactNode {
  let className = "bg-button hover:bg-button-hover cursor-pointer";
  if (props.variant === Variants.small) {
    className =
      "bg-button hover:bg-button-hover cursor-pointer px-2 py-1 text-center text-sm text-text-light rounded flex items-center";
  } else if (props.variant === Variants.medium) {
    className =
      "bg-button hover:bg-button-hover cursor-pointer px-4 py-2 text-center text-xl text-text-light rounded flex items-center";
  } else if (props.variant === Variants.large) {
    className =
      "bg-button hover:bg-button-hover cursor-pointer px-6 py-3 text-center text-2xl text-text-light rounded flex items-center";
  }
  return (
    <button className={className} onClick={props.onClick} type={props.type}>
      {props.children ?? ""}
    </button>
  );
}

interface NavigateProps {
  href: string;
  children?: ReactNode;
  variant?: Variant;
}
/** Navigate Component to direct to new page */
export function Navigate(props: NavigateProps): ReactNode {
  let className = "";
  if (props.variant === Variants.small) {
    className =
      "bg-button hover:bg-button-hover cursor-pointer px-2 py-1 text-center text-sm text-text-light rounded flex items-center self-center";
  } else if (props.variant === Variants.medium) {
    className =
      "bg-button hover:bg-button-hover cursor-pointer px-4 py-2 text-center text-xl text-text-light rounded flex items-center self-center";
  } else if (props.variant === Variants.large) {
    className =
      "bg-button hover:bg-button-hover cursor-pointer px-6 py-3 text-center text-2xl text-text-light rounded flex items-center self-center";
  }
  return (
    <Link className={className} href={props.href}>
      {props.children ?? ""}
    </Link>
  );
}

// Type for Input components
const InputTypes = {
  text: "text",
  password: "password",
} as const;
type InputType = (typeof InputTypes)[keyof typeof InputTypes];

interface InputFieldProps {
  placeHolder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  name?: string;
  type?: InputType;
}
/** Input Field to input text */
export function Input(props: InputFieldProps): ReactNode {
  return (
    <input
      className="mx-1 mb-4 px-2 py-1 bg-gray-300 text-text-dark rounded hover:bg-gray-400 text-center"
      placeholder={props.placeHolder}
      onChange={props.onChange}
      required={props.required}
      minLength={props.minLength}
      maxLength={props.maxLength}
      name={props.name}
      type={props.type}
    ></input>
  );
}
