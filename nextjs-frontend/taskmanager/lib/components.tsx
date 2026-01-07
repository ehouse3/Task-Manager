import { ChangeEvent, ReactElement } from "react";
import Link from "next/link";

// Variants for core components like Buttons, Navigation buttons
const VARIANTS = {
  bare: "bare",
  small: "small",
  medium: "medium",
  large: "large",
} as const;
type Variant = (typeof VARIANTS)[keyof typeof VARIANTS];

const BUTTONTYPES = {
  button: "button",
  submit: "submit",
  reset: "reset",
} as const;
type ButtonType = (typeof BUTTONTYPES)[keyof typeof BUTTONTYPES];

interface ButtonProps {
  onClick?: () => void;
  children?: string | ReactElement;
  variant?: Variant;
  type?: ButtonType;
}
/** Button Component that displays a button with callback function for press. */
export function Button(props: ButtonProps): ReactElement {
  if (
    props.variant == VARIANTS.small ||
    props.variant == VARIANTS.medium ||
    props.variant == VARIANTS.large
  ) {
    return (
      <button
        className="bg-button px-4 py-2 text-xl text-text-light rounded hover:bg-button-hover cursor-pointer"
        onClick={props.onClick}
        type={props.type}
      >
        {props.children ?? ""}
      </button>
    );
  } else {
    return (
      <button
        className="bg-button rounded hover:bg-button-hover cursor-pointer"
        onClick={props.onClick}
        type={props.type}
      >
        {props.children ?? ""}
      </button>
    );
  }
}

interface NavigateProps {
  href: string;
  children?: string | ReactElement;
  variant?: Variant;
}
/** Navigate Component to direct to new page */
export function Navigate(props: NavigateProps): ReactElement {
  if (
    props.variant == VARIANTS.small ||
    props.variant == VARIANTS.medium ||
    props.variant == VARIANTS.large
  ) {
    return (
      <Link
        className="mx-1 mb-4 px-4 py-1.5 bg-button text-center text-xl text-text-light rounded hover:bg-button-hover "
        href={props.href}
      >
        {props.children ?? ""}
      </Link>
    );
  } else {
    return (
      <Link
        className="bg-button text-center text-text-light rounded hover:bg-button-hover"
        href={props.href}
      >
        {props.children ?? ""}
      </Link>
    );
  }
}

interface TextFieldProps {
  placeHolder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  name?: string;
}
/** Input Field to input text */
export function TextField(props: TextFieldProps): ReactElement {
  return (
    <input
      className="mx-1 mb-4 px-2 py-1 bg-gray-300 text-text-dark rounded hover:bg-gray-400 text-center"
      placeholder={props.placeHolder}
      onChange={props.onChange}
      required={props.required}
      minLength={props.minLength}
      maxLength={props.maxLength}
      name={props.name}
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
  name?: string;
}
/** Input Field to input passwords */
export function PasswordField(props: PasswordFieldProps): ReactElement {
  return (
    <input
      className="mx-1 mb-4 px-2 py-1 bg-gray-300 text-text-dark rounded hover:bg-gray-400 text-center"
      placeholder={props.placeHolder}
      onChange={props.onChange}
      required={props.required}
      minLength={props.minLength}
      maxLength={props.maxLength}
      name={props.name}
      type="password"
    ></input>
  );
}
