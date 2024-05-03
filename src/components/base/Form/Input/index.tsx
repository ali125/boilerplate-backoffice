import React, { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import MuiInput, { OutlinedInputProps as MuiInputProps } from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputPassword from "../InputPassword";
import FormLabel from "../FormLabel";

export interface InputProps extends MuiInputProps {
  label?: string;
  errorMessage?: string;
  invalid?: boolean;
  onChangeValue?: (value: string) => void;
  className?: string;
  inputClassName?: string;
}

const Input: React.FC<InputProps> = props => {
  const { label, invalid, errorMessage, className, inputClassName, onChangeValue, type, value, ...restProps } = props;

  const inputValue = value ?? "";
  const id = useMemo(() => props.id || props.name || uuidv4(), [props.id, props.name]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeValue) onChangeValue(e.currentTarget.value);
    if (props.onChange) props.onChange(e);
  };
  return (
    <FormControl error={invalid} className={classNames("w-full", className)} variant="standard">
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      {type === "password" ? (
        <InputPassword
          id={id}
          onChange={onChangeHandler}
          className={classNames("rounded-full bg-white", inputClassName)}
          classes={{ input: "py-2 placeholder:text-sm placeholder:capitalize text-base" }}
          value={inputValue}
          {...restProps}
        />
      ) : (
        <MuiInput
          id={id}
          role="textbox"
          type={type}
          onChange={onChangeHandler}
          classes={{ input: "py-2 placeholder:text-sm placeholder:capitalize text-base" }}
          className={classNames("rounded-full bg-white", inputClassName)}
          value={inputValue}
          {...restProps}
        />
      )}
      {errorMessage && <FormHelperText id={id} className="first-letter:uppercase">{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default Input;
