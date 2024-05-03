import React, { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FilterItem, FilterItemColumn } from './TableControlFilter';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import Input from '@/components/base/Form/Input';
import Select from '@/components/base/Form/Select';
import Tooltip from "@/components/base/Tooltip";

interface Props {
    removable: boolean;
    filterItem: FilterItem;
    columns: FilterItemColumn[];
    onChange: (item: FilterItem) => void;
    onRemove: (itemId: string) => void;
}

const TableControlFilterItem: React.FC<Props> = memo(({ removable, filterItem, columns, onChange, onRemove }) => {
    const [selectedColumn, setSelectedColumn] = useState<string>(filterItem.col);
    const [selectedOperator, setSelectedOperator] = useState<string>(filterItem.op);
    const [value, setValue] = useState<string>(filterItem.val);

    const { t } = useTranslation();
  
    const handleChange = useCallback((col: string, op: string, val: string) => {
        onChange({
            id: filterItem.id,
            col,
            op,
            val,
        });
    }, [filterItem.id, onChange]);

    const handleChangeColumn = (column: string) => {
        setSelectedColumn(column);
        const operators = columns.find((i) => i.value === column)?.filterOperators;
        const opIndex = operators?.findIndex((i) => i.value === selectedOperator);
        if (operators && (operators || []).length > 0 && opIndex === -1) {
            const selectOp = operators[0].value;
            setSelectedOperator(selectOp);
            handleChange(column, selectOp, value);
        } else {
            handleChange(column, selectedOperator, value);
        }
    }
    const handleChangeOperator = (operator: string) => {
        setSelectedOperator(operator);
        handleChange(selectedColumn, operator, value);
    }
    const handleChangeVal = (val: string) => {
        setValue(val);
        handleChange(selectedColumn, selectedOperator, val);
    }

    const handleRemove = useCallback(() => {
        onRemove(filterItem.id);
    }, [onRemove, filterItem.id]);
  
    const operators = useMemo(() => {
      return columns.find((i) => i.value === selectedColumn)?.filterOperators || [];
    }, [columns, selectedColumn]);
    
    return (
        <div className='flex gap-3 mb-3 last:mb-0'>
            {removable && (
                <Tooltip title={t("general.remove")}>
                    <IconButton onClick={handleRemove} className="text-red-600">
                        <RemoveIcon />
                    </IconButton>
                </Tooltip>
            )}
            <Select
                placeholder={t("tableFilter.column")}
                className="flex-1 capitalize"
                options={columns}
                value={selectedColumn}
                onChangeValue={handleChangeColumn}
            />
            <Select
                placeholder={t("tableFilter.operator")}
                className="flex-1 capitalize"
                options={operators}
                value={selectedOperator}
                onChangeValue={handleChangeOperator}
            />
            <Input
                placeholder={t("general.value")}
                className="flex-1"
                value={value}
                onChangeValue={handleChangeVal}
            />
        </div>
    )
});

export default TableControlFilterItem;
