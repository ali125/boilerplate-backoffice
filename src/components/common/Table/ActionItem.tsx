import React, { memo, useMemo } from "react";
import { NavLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@/components/base/Tooltip";
import { ActionItemType } from "./TableHead/TableHead.interface";

interface ActionItemProps {
    action: ActionItemType;
    row: { [key: string]: any };
  }
  
const ActionItem: React.FC<ActionItemProps> = memo(({ action, row }) => {
const href = useMemo(() => typeof action.href === "function" ? action.href(row) : action.href, [row, action]);

return action?.onClick ? (
        <Tooltip key={action.id} title={action.label}>
            <IconButton
                aria-label={action.id}
                onClick={() => (action?.onClick ? action.onClick(row) : null)}
            >
                {action.icon}
            </IconButton>
        </Tooltip>
    ) : href ? (
        <Tooltip key={action.id} title={action.label}>
            <IconButton aria-label={action.id} component={NavLink} to={href} target={action.target}>
                {action.icon}
            </IconButton>
        </Tooltip>
    ) : null;
});

export default ActionItem