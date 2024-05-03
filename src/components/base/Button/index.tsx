import React from 'react';
import MUIButton, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const CustomButton = styled(MUIButton)({
    textTransform: 'capitalize',
    fontSize: 16,
    padding: '6px 26px',
    lineHeight: 1.5,
    borderRadius: 100,
});

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <CustomButton variant="contained" {...props} />
  )
}

export default Button