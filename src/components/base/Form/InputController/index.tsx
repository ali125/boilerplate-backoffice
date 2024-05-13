import React from "react";
import { Controller, RegisterOptions } from "react-hook-form";
import Input, { InputProps } from "../Input";

export interface InputControllerProps extends InputProps {
  label?: string;
  name: string;
  control: any;
  rules?: RegisterOptions;
}

const InputController: React.FunctionComponent<InputControllerProps> = ({ name, control, rules, defaultValue, errorMessage, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value }, fieldState: { invalid, error } }) => (
        <Input
          {...props}
          id={name}
          onBlur={onBlur}
          onChangeValue={onChange}
          errorMessage={(error as any)?.message || errorMessage || ""}
          invalid={invalid || !!errorMessage}
          value={value}
        />
      )}
    />
  );
};

export default InputController;
