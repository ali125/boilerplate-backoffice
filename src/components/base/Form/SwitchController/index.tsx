import React from "react";
import { Controller, RegisterOptions } from "react-hook-form";
import Switch, { SwitchProps } from "../Switch";


export interface SwitchControllerProps extends SwitchProps {
  label?: string;
  name: string;
  control: any;
  rules?: RegisterOptions;
  defaultValue?: boolean;
}

export const SwitchController: React.FC<SwitchControllerProps> = ({
  name,
  control,
  rules,
  defaultValue,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue || false}
      render={({ field: { onChange, value }, fieldState: { invalid, error } }) => (
        <Switch
          {...props}
          name={name}
          onChangeValue={(value) => {
            onChange(value);
            if (props?.onChangeValue) props.onChangeValue(value)
          }}
          errorMessage={invalid ? (error as any).message : ""}
          invalid={invalid}
          value={value ?? defaultValue ?? false}
        />
      )}
    />
  );
};
