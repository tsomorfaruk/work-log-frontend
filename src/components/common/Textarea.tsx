import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

type PropTypes = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export default function Textarea(props: PropTypes) {
  return <textarea {...props} />;
}
