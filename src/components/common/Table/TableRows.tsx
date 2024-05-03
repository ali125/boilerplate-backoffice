import React from "react";
import {
  ActionsType,
  TableHeadItemType,
} from "./TableHead/TableHead.interface";
import TableRow from "./TableRow";

interface Props {
  rows: { [key: string]: any };
  head: TableHeadItemType[];
  disableActions?: boolean;
  actions?: ActionsType;
}

const TableRows: React.FC<Props> = ({ actions, disableActions, head, rows }) => (
  <>
    {rows.map((row: any) => (
      <TableRow key={row.id} head={head} row={row} actions={actions} disableActions={disableActions} />
    ))}
  </>
);

export default TableRows;
