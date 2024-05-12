import React from "react";
import { Controller, RegisterOptions } from "react-hook-form";
import Autocomplete, { AutocompleteProps } from "../Autocomplete";

export interface AutocompleteControllerProps extends AutocompleteProps {
  label?: string;
  name: string;
  control: any;
  rules?: RegisterOptions;
}

const AutocompleteController: React.FunctionComponent<AutocompleteControllerProps> = ({ name, control, rules, defaultValue, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value }, fieldState: { invalid, error } }) => {
        return (
          <Autocomplete
            {...props}
            id={name}
            onBlur={onBlur}
            onChange={onChange}
            errorMessage={invalid ? (error as any).message : ""}
            invalid={invalid}
            value={value}
          />
        )
      }}
    />
  );
};

export default AutocompleteController;
