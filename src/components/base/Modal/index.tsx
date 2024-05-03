import React from 'react';
import MUIModal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

import { ModalProps } from './Modal.interface';
import { modalBodyStyle, modalContainerStyle, modalFooterStyle, modalHeadStyle } from './Styles';

const Modal: React.FC<ModalProps> = ({ id, title, children, footer, open, size = "medium", onClose }) => {
  return (
    <MUIModal
        open={open}
        onClose={onClose}
        closeAfterTransition
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
    >
        <Fade in={open}>
            <Box sx={modalContainerStyle(size)}>
                <Box sx={modalHeadStyle}>
                    <Typography id={`${id}-title`} variant="h6" className='capitalize' component="h2">
                        {title}
                    </Typography>

                    <IconButton onClick={onClose}>
                        <Close />
                    </IconButton>
                </Box>
                <Box sx={modalBodyStyle}>
                    {children}
                </Box>
                {footer && (
                    <Box sx={modalFooterStyle}>
                        {footer}
                    </Box>
                )}
            </Box>
        </Fade>
    </MUIModal>
  )
}

export default Modal