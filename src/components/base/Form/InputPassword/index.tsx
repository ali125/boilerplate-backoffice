import React, { useCallback } from "react";
import MuiInput, { OutlinedInputProps as MuiInputProps } from "@mui/material/OutlinedInput";
import Lock from "@mui/icons-material/Lock";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

const InputPassword: React.FC<MuiInputProps> = props => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(show => !show);
  }, []);

  const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }, []);

  return (
    <MuiInput
      id="password"
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      startAdornment={
        props.startAdornment ?? (
          <InputAdornment position="start">
            <Lock />
          </InputAdornment>
        )
      }
      endAdornment={
        props.endAdornment ?? (
          <InputAdornment position="end">
            <IconButton tabIndex={-1} aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }
      {...props}
    />
  );
};

export default InputPassword;
