import React, { useCallback } from 'react'
import { FormControlLabel, Switch as MuiSwitch } from '@mui/material'

export interface SwitchTextProps {
    isError: boolean;
}
  
export interface SwitchProps  {
    label?: string;
    name: string;
    errorMessage?: string;
    invalid?: boolean;
    value?: boolean;
    formClassName?: any;
    onChangeValue?: (value: boolean) => void;
}

const Switch: React.FC<SwitchProps> = (props) => {
    const { label, value, name, onChangeValue } = props;

    const handleChange = useCallback((_e: any, checked: boolean) => {
        if (onChangeValue) onChangeValue(checked)
    }, [onChangeValue]);

    return (
        <FormControlLabel classes={{ label: "text-xs capitalize" }} className={props.formClassName}
            control={
                <MuiSwitch
                    checked={value}
                    onChange={handleChange}
                    name={name}
                />
            }
            label={label}
        />
    )
}

export default Switch;
