import React from 'react';
import { NavLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Tooltip from "@/components/base/Tooltip";
import { ExtraItemControl } from './TableHead.interface';

type Props = {
  extraControl?: ExtraItemControl[];
}

const TableHeadExtraControl: React.FC<Props> = ({ extraControl }) => {
  return (extraControl || []).map((controller) => (
    <Tooltip key={controller.id} title={controller.label}>
      {controller.href ? (
        <NavLink to={controller.href} target={controller.target}>
          {controller.icon}
        </NavLink>
      ) : (
        <IconButton onClick={controller.onClick}>
          {controller.icon}
        </IconButton>
      )}
    </Tooltip>
  ))
}

export default TableHeadExtraControl