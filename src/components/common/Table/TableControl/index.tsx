import React from 'react';
import TableControlView from './TableControlView';
import TableControlFilter from './TableControlFilter';
import { TableHeadItemType } from '../TableHead/TableHead.interface';

interface Props {
  data: TableHeadItemType[];
  disableFilter?: boolean;
  onChangeView: (data: TableHeadItemType[]) => void;
}

const TableControl: React.FC<Props> = ({ data, disableFilter, onChangeView }) => {  
  return (
    <>
      {!disableFilter && (
        <TableControlFilter data={data} />
      )}
      <TableControlView
        data={data}
        onChange={onChangeView}
      />
    </>
  )
}

export default TableControl