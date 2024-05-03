import React from 'react'
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Popper, { PopperPlacementType } from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';

interface Props {
    anchorRef: HTMLElement | null;
    menuList?: {
        id: string;
        icon?: React.ReactNode;
        label: string | React.ReactNode;
        url?: string;
        onClick?: () => void;
    }[];
    children?: React.ReactNode,
    closeable?: boolean;
    menuClassName?: string;
    isOpen: boolean;
    placement?: PopperPlacementType;
    onClose: () => void;
}

const Dropdown: React.FC<Props> = ({ anchorRef, menuClassName, menuList, children, isOpen, placement, closeable = true, onClose }) => {
    const handleClose = (event: Event | React.SyntheticEvent) => {
      if (
        anchorRef &&
        anchorRef.contains(event.target as HTMLElement)
      ) {
        return;
      }
  
      onClose();
    };

    return (
        <Popper
            open={isOpen}
            anchorEl={anchorRef}
            role={undefined}
            placement={placement || "bottom-start"}
            className='z-50'
            transition
            disablePortal
        >
            {({ TransitionProps }) => (
            <Grow
                {...TransitionProps}
                style={{
                    transformOrigin: 'left top'
                }}
            >
                <Paper>
                    {menuList ? (
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                                autoFocusItem={isOpen}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                                className={classNames("w-[8rem]", menuClassName)}
                            >
                            {menuList.map((item) => (
                                <MenuItem
                                    key={item.id}
                                    className="w-full px-0"
                                    onClick={closeable ? handleClose : undefined}
                                >
                                    {item.url ? (
                                        <NavLink
                                            to={item.url}
                                            className={classNames("block w-full text-xs font-medium hover:bg-gray-100", {
                                                "px-3": typeof item.label === "string",
                                                "flex items-center gap-2": item.icon
                                            })}
                                        >
                                            {item.icon}
                                            {item.label}
                                        </NavLink>
                                    ) : (
                                        <span
                                            onClick={item.onClick && item.onClick}
                                            className={classNames("block w-full text-xs font-medium", {
                                                "px-3": typeof item.label === "string",
                                                "hover:bg-gray-100": !!item.onClick,
                                                "flex items-center gap-2": item.icon
                                            })}
                                        >
                                            {item.icon}
                                            {item.label}
                                        </span>
                                    )}
                                    
                                </MenuItem>
                            ))}
                            </MenuList>
                        </ClickAwayListener>
                    ) : children ? (
                        <ClickAwayListener onClickAway={handleClose}>
                            <Box>
                                {children}
                            </Box>
                        </ClickAwayListener>
                    ) : null}
                </Paper>
            </Grow>
            )}
        </Popper>
    );
}

export default Dropdown;
