import { InputHTMLAttributes } from "react";

export interface TextFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  label?: string;
  required?: boolean;
  placeholder?: string;
  fullWidth?: boolean;
  inputSize?: "small" | "mid" | "large";
  type: "text" | "email" | "password" | "date" | "url" | "number";
}

export const fieldSize = {
  small: "",
  mid: "px-3 py-2 text-base",
  large: "px-4 py-3 text-lg",
};

export interface Options {
  value: string;
  label: string;
}

export interface ChoiceFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange"
> {
  label?: string;
  required?: boolean;
  placeholder?: string;
  fullWidth?: boolean;
  type: "checkbox" | "radio";
  options?: Options[]; //For Radio and Checkbox input
  onChange?: (value: string | string[]) => void;
  name?: string;
}
