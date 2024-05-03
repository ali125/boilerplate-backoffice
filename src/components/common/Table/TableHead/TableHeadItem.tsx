import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import TableCell from '@mui/material/TableCell'
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import { TableHeadItemType } from './TableHead.interface';
import { convertQueryToString } from '@/utils/helpers/string';

// const HeadItemStyle = styled(TableCell)`
//     &:hover .sortIcon {
//         opacity: 1;
//     }
// `;

const TableHeadItem: React.FC<{ item: TableHeadItemType }> = ({ item }) => {
    const [sortType, setSortType] = useState<'desc' | 'asc'>('asc');
    const navigate = useNavigate();
    const location = useLocation()
    const [searchParams] = useSearchParams();

    // asc => 1,2,3,4 | desc => 4,3,2,1
    // ?sort=[field],desc
    const urlSort = searchParams.get("sort") || null;

    useEffect(() => {
        if (urlSort) {
            const [field, type] = urlSort.split(',');
            if (field === item.id && (type === 'desc' || type === 'asc')) {
                setSortType(type);
            } else {
                setSortType('asc');
            }
        }
    }, [urlSort, item]);

    const isSorted = useMemo(() => {
        const [field] = (urlSort || "").split(',');
        return field === item.id;
    } ,[urlSort, item]);

    const handleSort = () => {
        if (item.sortable) {
            const [field] = (urlSort || "").split(',');
            const sortBase = field !== item.id ? 'asc' : sortType === "desc" ? "" : "desc";
            const query = convertQueryToString({
                ...Object.fromEntries(searchParams.entries()) || {},
                sort: sortBase ? `${item.id},${sortBase}` : ""
            });
            navigate(`${location.pathname}${query}`);
        }
    }

    const SortIcon = useMemo(() => sortType === "asc" ? ArrowUpward : ArrowDownward, [sortType]);

    return (
        <TableCell
            align={item.align ? item.align : "center"}
            className={classNames("py-2", {
                "cursor-pointer transition-all group hover:bg-gray-100": item.sortable,
                "pl-11": item.sortable && item.align === "center"
            }, item.className)}
            onClick={handleSort}
        >
            <span className='inline-flex items-center gap-3 capitalize'>
                {item.label}
                {item.sortable && (
                    <SortIcon
                        className={classNames("sortIcon w-5 h-5 transition-all mr-2 group-hover:opacity-100", {
                            "opacity-0 text-gray-400": !isSorted,
                            "opacity-1 text-gray-600": isSorted,
                        })}
                    />
                )}
            </span>
        </TableCell>
    );
}

export default TableHeadItem