import React, { useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import MuiAutocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteValue, AutocompleteProps as MuiAutocompleteProps } from "@mui/material/Autocomplete";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "../FormLabel";

export type OptionItem = {
  value: number | string,
  label: string | React.ReactNode,
}

export type AutocompleteProps = Omit<MuiAutocompleteProps<any, any, any, any> & {
  label?: string;
  name?: string;
  placeholder?: string;
  errorMessage?: string;
  invalid?: boolean;
  onChangeValue?: (value: string) => void;
  onInputChange?: (value: string) => void;
  onChange?: (OptionItem: OptionItem) => void;
  className?: string;
  options: OptionItem[];
  inputClassName?: string;
}, "renderInput">

type OnChange = (
  event: React.SyntheticEvent,
  value: AutocompleteValue<any, boolean, boolean, boolean>,
  reason: AutocompleteChangeReason,
  details?: AutocompleteChangeDetails<any>,
) => void;

const Autocomplete: React.FC<AutocompleteProps> = props => {
  const { label, invalid, errorMessage, className, inputClassName, onChangeValue, value, options, onChange, placeholder, onInputChange, ...restProps } = props;

  const id = useMemo(() => props.id || props.name || uuidv4(), [props.id, props.name]);

  const onChangeHandler: OnChange = useCallback((_event, val) => {
    if (onChangeValue) onChangeValue(val.value);
    if (onChange) onChange(val);
  }, [onChangeValue,onChange]);

  const onInputChangeHandler = useCallback((e: React.SyntheticEvent, value: string) => {
    if (onInputChange) onInputChange(value);
  }, [onInputChange]);
  
  const val = useMemo(() => {
    if (typeof value === "string") {
      return options.find((opt) => opt.value === value);
    }
    return value;
  }, [value, options]);

  return (
    <FormControl error={invalid} className={twMerge(classNames("w-full", className))} variant="standard">
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <MuiAutocomplete
        id={id}
        role="textbox"
        onChange={onChangeHandler}
        value={val}
        classes={{ inputRoot: "rounded-full bg-white !py-0.5", input: "!py-2 placeholder:text-sm rounded-full bg-white placeholder:capitalize text-base"}}
        options={options}
        onInputChange={onInputChangeHandler}
        renderInput={(params) => (
          <TextField {...params} placeholder={placeholder} />
        )}
        {...restProps}
      />
      {errorMessage && <FormHelperText id={id} className="first-letter:uppercase">{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default Autocomplete;
