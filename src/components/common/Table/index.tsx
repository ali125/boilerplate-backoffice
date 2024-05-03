import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MuiTableHead from '@mui/material/TableHead';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';

import TablePagination from './TablePagination'
import TableHead from './TableHead'
import TableRows from './TableRows'
import TableEmpty from "./TableEmpty";
import { ActionsType, ExtraItemControl, TableHeadItemType } from './TableHead/TableHead.interface'
import { ListPagination } from "@/@types/response.type";
import Loading from "@/components/base/Loading";

type Data = ListPagination<any[]>

interface Props {
  isLoading?: boolean;
  emptyMessage?: string;
  data?: Data;
  disableFilter?: boolean;
  disableActions?: boolean;
  head: TableHeadItemType[];
  actions?: ActionsType;
  extraControl?: ExtraItemControl[];
}

const Table: React.FC<Props> = ({ data, head, actions, extraControl, isLoading, disableFilter, disableActions, emptyMessage }) => {
  const [columns, setColumns] = useState<TableHeadItemType[]>(head);

  const { t } = useTranslation();

  // if ((data?.data || []).length === 0) {
  //   return (
      // <Paper>
      //   <TableEmpty label={emptyMessage || t("errors.dataNotFound")} />
      // </Paper>
  //   );
  // }
  return (
    <TableContainer className="relative min-h-[60vh] flex flex-col rounded-lg" component={Paper}>
      {isLoading && (
        <div className="absolute top-0 left-0 z-20 w-full h-full flex items-center justify-center bg-gray-500/20">
          <Loading />
        </div>
      )}
      <MuiTable>
        <MuiTableHead>
          <TableHead
            data={columns}
            disableFilter={disableFilter}
            disableActions={disableActions}
            onChangeView={setColumns}
            extraControl={extraControl}
            hasAction={!!(actions && actions.length > 0)}
          />
        </MuiTableHead>
        <TableBody>
          <TableRows rows={data?.data || []} head={columns} disableActions={disableActions} actions={actions} />
        </TableBody>
      </MuiTable>
      {((data?.data || []).length === 0) ? (
        <TableEmpty label={emptyMessage || t("errors.dataNotFound")} />
      ) : data && <TablePagination data={data} />}
    </TableContainer>
  );
}

export default Table;
