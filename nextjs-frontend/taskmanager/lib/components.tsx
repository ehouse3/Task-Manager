import { ReactElement } from "react";
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
      {props.innerText}
    </button>
  );
}

interface LinkProps {
  href: string;
  innerText?: string;
}
/** Navigate Component to direct to new page */
export function Navigate(props: LinkProps): ReactElement {
  return (
    <Link
      className="mx-1 mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      href={props.href}
    >
      {props.innerText}
    </Link>
  );
}
