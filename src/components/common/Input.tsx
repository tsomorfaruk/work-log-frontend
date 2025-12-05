import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type PropTypes = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function Input(props: PropTypes) {
  return <input {...props} />;
}
