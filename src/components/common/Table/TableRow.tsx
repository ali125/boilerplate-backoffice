import React from "react";
import MuiTableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {
  ActionsType,
  TableHeadItemType,
} from "./TableHead/TableHead.interface";
import ActionItem from "./ActionItem";

interface Props {
    head: TableHeadItemType[];
    row: { [key: string]: any };
    disableActions?: boolean;
    actions?: ActionsType;
}
  
const TableRow: React.FC<Props> = ({ row, head, disableActions, actions }) => (
    <MuiTableRow
        sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        }}
    >
        {head.filter(i => !i.hidden).map((th) => (
            <TableCell
                key={th.id}
                align={th.align ? th.align : "center"}
                className="text-sm py-0"
            >
                {th.render
                ? th.render(row[th.id.toString()], row)
                : row[th.id.toString()]}
            </TableCell>
        ))}
        {!disableActions && (
            <>
                {actions && actions.length > 0 ? (
                    <TableCell align="right" className="py-1.5 whitespace-nowrap">
                        {actions.map((action) => (
                            <ActionItem key={action.id} action={action} row={row} />
                        ))}
                    </TableCell>
                ) :  <TableCell align="right" className="py-1.5" />}
            </>
        )}
    </MuiTableRow>
);

export default TableRow;
