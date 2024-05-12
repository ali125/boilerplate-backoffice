import React, { useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import MuiAutocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteValue, AutocompleteProps as MuiAutocompleteProps } from "@mui/material/Autocomplete";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
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
  onInputChange?: (value: string) => void;
  onChange?: (OptionItem: OptionItem | OptionItem[]) => void;
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

const CustomOption = ({ option, value, ...props }: any) => {
  const selected = useMemo(() => {
    if (Array.isArray(value)) {
      return !!value.find((item: any) => item.value === option.value)
    }
    return value?.value === option.value;
  }, [option, value]);

  return (
    <Typography {...props} aria-selected={selected} >
      {option.label}
    </Typography>
  );
}

const Autocomplete: React.FC<AutocompleteProps> = props => {
  const { label, invalid, errorMessage, className, inputClassName, value, options, multiple, onChange, placeholder, onInputChange, ...restProps } = props;

  const id = useMemo(() => props.id || props.name || uuidv4(), [props.id, props.name]);

  const checkDuplicateIds = useCallback((arr: any[] = []) => {
    const ids = new Set();
    for (const obj of arr) {
      if (ids.has(obj.value)) {
        return obj.value; // Found a duplicate ID
      }
      ids.add(obj.value);
    }
    return false; // No duplicate IDs found
  }, []);


  const onChangeHandler: OnChange = useCallback((_event, val) => {
    if (onChange) {
      if (Array.isArray(val)) {
        const duplicateIds = checkDuplicateIds(val);
        if (duplicateIds) {
          const result = val.filter((item: any) => item.value !== duplicateIds);
          onChange(result);
        } else {
          onChange(val);
        }
      } else {
        onChange(val);
      }
    }
  }, [onChange]);

  const onInputChangeHandler = useCallback((e: React.SyntheticEvent, value: string) => {
    if (onInputChange) onInputChange(value);
  }, [onInputChange]);

  return (
    <FormControl error={invalid} className={twMerge(classNames("w-full", className))} variant="standard">
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <MuiAutocomplete
        id={id}
        multiple={multiple}
        role="textbox"
        onChange={onChangeHandler}
        value={value}
        classes={{ inputRoot: "rounded-full bg-white !py-0.5", input: "!py-2 placeholder:text-sm rounded-full bg-white placeholder:capitalize text-base"}}
        options={options}
        onInputChange={onInputChangeHandler}
        getOptionLabel={(option) => option.label}
        getOptionKey={(option) => option.value}
        renderOption={(props, option) => <CustomOption {...props} option={option} value={value} />}
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
