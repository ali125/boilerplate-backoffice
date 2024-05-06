import React, { useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import MuiSelect, { SelectProps as MuiSelectProps, SelectChangeEvent } from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Input from "../Input";
import FormLabel from "../FormLabel";
import { twMerge } from "tailwind-merge";

export type OptionItem = {
  value: number | string,
  label: string | React.ReactNode,
}

export type SelectProps = MuiSelectProps & {
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  invalid?: boolean;
  onChangeValue?: (value: string) => void;
  className?: string;
  options: OptionItem[];
  inputClassName?: string;
}

const Select: React.FC<SelectProps> = props => {
  const { label, invalid, errorMessage, className, inputClassName, onChangeValue, value, options, onChange, placeholder, ...restProps } = props;

  const id = useMemo(() => props.id || props.name || uuidv4(), [props.id, props.name]);

  const onChangeHandler = useCallback( (e: SelectChangeEvent<unknown>, child: React.ReactNode) => {
    if (onChangeValue) onChangeValue(e.target.value as string);
    if (onChange) onChange(e, child);
  }, [onChangeValue,onChange]);

  return (
    <FormControl error={invalid} className={twMerge(classNames("w-full", className))} variant="standard">
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <MuiSelect
        id={id}
        role="textbox"
        onChange={onChangeHandler}
        className={classNames("rounded-full bg-white", inputClassName)}
        value={value}
        label={label}
        input={<Input value={placeholder} />}
        {...restProps}
      >
        {placeholder && (
          <MenuItem disabled value="none">
            <span className="text-gray-400 capitalize font-medium">{placeholder}</span>
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))}
      </MuiSelect>
      {errorMessage && <FormHelperText id={id}>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default Select;
