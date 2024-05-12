import React from "react";
import { Controller, RegisterOptions } from "react-hook-form";
import FileSelector, { FileSelectorProps } from "../FileSelector";

export interface FileSelectorControllerProps extends FileSelectorProps  {
  label?: string;
  name: string;
  control: any;
  rules?: RegisterOptions;
}

export const FileSelectorController: React.FC<FileSelectorControllerProps> = ({
  name,
  control,
  rules,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { invalid, error } }) => (
        <FileSelector
          {...props}
          id={name}
          onChangeFile={onChange}
          errorMessage={invalid ? (error as any).message : ""}
          invalid={invalid}
          value={value}
        />
      )}
    />
  );
};
