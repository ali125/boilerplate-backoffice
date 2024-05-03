import React from "react";
import { Controller, RegisterOptions } from "react-hook-form";
import Select, { SelectProps } from "../Select";

export interface SelectControllerProps extends SelectProps {
  label?: string;
  name: string;
  control: any;
  rules?: RegisterOptions;
}

const SelectController: React.FunctionComponent<SelectControllerProps> = ({ name, control, rules, defaultValue, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value }, fieldState: { invalid, error } }) => (
        <Select
          {...props}
          id={name}
          onBlur={onBlur}
          onChangeValue={onChange}
          errorMessage={invalid ? (error as any).message : ""}
          invalid={invalid}
          value={value}
        />
      )}
    />
  );
};

export default SelectController;
