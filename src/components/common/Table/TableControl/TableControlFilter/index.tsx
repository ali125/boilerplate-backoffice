import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { t } from 'i18next';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

import Modal from '@/components/base/Modal';
import Button from '@/components/base/Button';
import Tooltip from "@/components/base/Tooltip";
import { convertQueryToString } from '@/utils/helpers/string';
import { TableHeadItemType } from '../../TableHead/TableHead.interface';
import { FilterItem, FilterItemColumn, filterOperatorItem } from './TableControlFilter';
import TableControlFilterItem from './TableControlFilterItem';
import Select from '@/components/base/Form/Select';

const mainOperator = [
  { label: t('tableFilter.and').toUpperCase(), value: "and" },
  { label: t('tableFilter.or').toUpperCase(), value: "or" },
];

const operators: filterOperatorItem[] = [
  { label: t("tableFilter.equal"), value: "equal" },
  { label: t("tableFilter.include"), value: "include" },
  { label: t("tableFilter.notEqual"), value: "notEqual" },
];  

interface Props {
  data: TableHeadItemType[];
}

const TableControlFilter: React.FC<Props> = ({ data }) => {
  const [filterItems, setFilterItems] = useState<FilterItem[]>([]);
  const [operator, setOperator] = useState<string>(mainOperator[0].value);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const { t } = useTranslation();

  const urlFilters = searchParams.get("filters") || null;
  const urlFilterOperator = searchParams.get("filterOperator") || null;

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const columns = useMemo(() => {
    const enabledColumns = data.filter((i) => !i?.disabledFilter);
    return enabledColumns.map((i) => {
      let filterOperators = operators
      if ((i?.filterOperators || [])?.length > 0) {
        filterOperators = operators.filter((operator) => (i?.filterOperators || []).includes(operator.value))
      }
      return {
        label: i.label,
        value: i.id,
        filterOperators
      }
    }) as FilterItemColumn[];
  }, [data]);

  useEffect(() => {
    if (urlFilterOperator) {
      setOperator(urlFilterOperator);
    }
  }, [urlFilterOperator]);

  useEffect(() => {
    if (urlFilters) {
      const filterItemQuery = urlFilters.split(",").map((item) => {
        const filterItem = item.split("|");
        return {
          id: uuidv4(),
          col: filterItem[0],
          op: filterItem[1],
          val: filterItem[2] || ""
        }
      });
      setFilterItems(filterItemQuery);
    } else {
      setFilterItems([{
        id: uuidv4(),
        col: columns[0].value.toString(),
        op: columns[0].filterOperators[0].value,
        val: ""
      }]);
    }
  }, [columns, urlFilters]);

  const handleChange = useCallback((item: FilterItem) => {
    setFilterItems((prev) => {
      const updatePrev = [...prev];
      const indx = updatePrev.findIndex((i) => i.id === item.id);
      if (indx !== -1) {
        updatePrev[indx] = item;
      }
      return updatePrev;
    });
  }, []);

  const handleRemove = useCallback((itemId: string) => {
    setFilterItems((prev) => {
      const updatePrev = [...prev];
      const indx = updatePrev.findIndex((i) => i.id === itemId);
      if (indx !== -1) {
        updatePrev.splice(indx, 1);
      }
      return updatePrev;
    });
  }, []);

  const handleAdd = useCallback(() => {
    setFilterItems((prev) => ([
      ...prev,
      {
        id: uuidv4(),
        col: "",
        op: "",
        val: ""
      }
    ]));
  }, [setFilterItems]);

  const removable = useMemo(() => filterItems.length > 1, [filterItems]);
  const addable = useMemo(() => {
    if (filterItems.length > 0) {
      const lastItem = filterItems[filterItems.length - 1];
      return !!lastItem?.col && !!lastItem?.op;
    }
    return false;
  }, [filterItems]);

  const handleReset = useCallback(() => {
    setFilterItems([{
      id: uuidv4(),
      col: columns[0].value.toString(),
      op: columns[0].filterOperators[0].value,
      val: ""
    }]);
    const queryObj: any = {
      ...Object.fromEntries(searchParams.entries()) || {}, 
      page: "1",
    };
    delete queryObj.filterOperator;
    delete queryObj.filters;
    const query = convertQueryToString(queryObj);
    navigate(`${location.pathname}${query}`);
    handleClose();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns]);

  const handleSubmit = () => {
    const filters = filterItems.map((i) => i.col && i.op ? `${i.col}|${i.op}|${i.val}` : null).filter(i => i);
    const query = convertQueryToString({
      ...Object.fromEntries(searchParams.entries()) || {}, 
      page: "1",
      filters: filters.join(","),
      filterOperator: operator
    });
    navigate(`${location.pathname}${query}`);
    handleClose();
  };
  
  return (
    <>
      <Tooltip title={t("general.filter")}>
        <IconButton onClick={handleOpen}>
          {urlFilters ? (
            <FilterAltIcon fontSize='small' />
          ) : (
            <FilterAltOutlinedIcon fontSize='small' />
          )}
        </IconButton>
      </Tooltip>
      <Modal
        title={t("general.filter")}
        open={isOpen}
        onClose={handleClose}
        footer={(
          <>
            <Button onClick={handleSubmit}>{t("general.filter")}</Button>
            {(filterItems.length > 1 || urlFilters) && (
              <Button variant='outlined' onClick={handleReset}>{t("general.reset")}</Button>
            )}
          </>
        )}
      >
        <div className='min-h-[14rem] w-[35rem]'>
            {filterItems.map((filterItem) => (
              <TableControlFilterItem
                key={filterItem.id}
                removable={removable}
                filterItem={filterItem}
                columns={columns}
                onChange={handleChange}
                onRemove={handleRemove}
              />
            ))}
            
            <div className="flex items-center gap-3 mb-5">
              <Tooltip title={t("general.add")}>
                <IconButton disabled={!addable} onClick={handleAdd} className="text-green-600">
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Select
                aria-label={t("tableFilter.operator")}
                value={operator}
                className="w-40 flex items-center gap-3"
                options={mainOperator}
                onChangeValue={setOperator}
              />
            </div>
        </div>
      </Modal>
    </>
  )
}

export default TableControlFilter;
