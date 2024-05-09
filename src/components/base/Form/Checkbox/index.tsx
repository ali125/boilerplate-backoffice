import MuiCheckBox, { CheckboxProps as MuiCheckboxProps } from "@mui/material/Checkbox";

export type CheckboxProps = MuiCheckboxProps;

const CheckBox = (props: CheckboxProps) => {
  return <MuiCheckBox {...props} />;
};

export default CheckBox;
