import React from 'react';
import MuiTooltip, { TooltipProps } from "@mui/material/Tooltip";

const Tooltip: React.FC<TooltipProps> = (props) => (
    <MuiTooltip classes={{ tooltip: "capitalize"}} {...props} />
);

export default Tooltip;
