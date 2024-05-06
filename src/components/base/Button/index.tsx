import React from 'react';
import MUIButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';

export type ButtonProps = MuiButtonProps & {
  isLoading?: boolean;
};

const CustomButton = styled(MUIButton)({
    textTransform: 'capitalize',
    fontSize: 16,
    padding: '6px 26px',
    lineHeight: 1.5,
    borderRadius: 100,
});

const Button: React.FC<ButtonProps> = (props) => {
  const { isLoading, disabled, ...resetProps } = props;
  return (
    <CustomButton
      variant="contained"
      startIcon={isLoading && <CircularProgress size="1.1rem" />}
      disabled={disabled || isLoading}
      {...resetProps}
    />
  )
}

export default Button;