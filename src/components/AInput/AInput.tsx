import { type ChangeEvent, useState } from "react";
import { TextFieldProps, ChoiceFieldProps } from "./AInput.types";

const TextField = ({
  label,
  required,
  placeholder,
  fullWidth,
  type,
  inputSize = "mid",
  ...props
}: TextFieldProps) => {
  const fieldSize = {
    small: "px-2 py-1 text-sm",
    mid: "px-3 py-2 text-base",
    large: "px-4 py-3 text-lg",
  };

  return (
    <div className={`${fullWidth ? "w-full" : ""} flex flex-col gap-1`}>
      <label className="text-gray-500 block text-sm font-medium">
        {label} {required && <span>*</span>}
      </label>
      <input
        {...props}
        type={type}
        placeholder={placeholder}
        className={`
            border rounded-md outline-none text-black
            ${fieldSize[inputSize]}
            ${fullWidth ? "w-full" : ""}
        `}
      />
    </div>
  );
};

const ChoiceField = ({
  label,
  required,
  fullWidth,
  placeholder,
  type,
  options,
  onChange,
  name,
  ...props
}: ChoiceFieldProps) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className={`${fullWidth ? "w-full" : ""} flex-flex-col gap-1`}>
      {label && (
        <label className="text-gray-500 block text-sm font-medium">
          {label} {required && <span>*</span>}
        </label>
      )}

      {options && options.length > 0 ? (
        options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2">
            <input
              {...props}
              type={type}
              name={type === "radio" ? name : undefined}
              placeholder={placeholder}
              value={opt.value}
              checked={
                type === "radio" ? selectedValue === opt.value : undefined
              }
              onChange={changeHandler}
              className="border rounded-md outline-none"
            />
            <span>{opt.label}</span>
          </label>
        ))
      ) : (
        <input
          {...props}
          type={type}
          name={type === "radio" ? name : undefined}
          value={selectedValue}
          placeholder={placeholder}
          onChange={(e) => {
            setSelectedValue(e.target.value);
            onChange?.(e.target.value);
          }}
          className="border rounded-md outline-none"
        />
      )}
    </div>
  );
};

export const AInput = {
  TextField,
  ChoiceField,
};

export default AInput;
export { TextField, ChoiceField };
