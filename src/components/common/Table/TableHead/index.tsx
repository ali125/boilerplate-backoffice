import React, { useMemo } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { ExtraItemControl, TableHeadItemType } from './TableHead.interface';
import TableControl from '../TableControl';
import TableHeadItem from './TableHeadItem';
import TableHeadExtraControl from './TableHeadExtraControl';

interface Props {
    data: TableHeadItemType[];
    disableFilter?: boolean;
    disableActions?: boolean;
    hasAction: boolean;
    extraControl?: ExtraItemControl[];
    onChangeView: (data: TableHeadItemType[]) => void;
}

const TableHead: React.FC<Props> = ({ data, disableActions, extraControl, disableFilter, onChangeView }) => {
    const filteredData = useMemo(() => data.filter((i) => !i.hidden), [data]);
    return (
        <TableRow>
            {filteredData.map((row) => (
                <TableHeadItem key={row.id} item={row} />
            ))}
            {!disableActions && (
                <TableCell align="right" className='whitespace-nowrap py-2'>
                    <TableHeadExtraControl extraControl={extraControl} />
                    <TableControl
                        disableFilter={disableFilter}
                        data={data}
                        onChangeView={onChangeView}
                    />
                </TableCell>
            )}
        </TableRow>
    );
}

export default TableHead