import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';

import { convertQueryToString } from '@/utils/helpers/string';
import { ListPagination } from '@/@types/response.type';

type Props = { data: ListPagination<unknown> }

const TablePagination: React.FC<Props> = ({ data }) => {
    const [page, setPage] = useState<number | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const urlPage = searchParams.get("page") || 1;

    useEffect(() => {
        setPage(+urlPage);
    }, [urlPage, page]);

    const handleChangePage = (_e: any, newPage: number) => {
        const query = convertQueryToString({
            ...Object.fromEntries(searchParams.entries()) || {}, 
            page: newPage
        });
        navigate(`${location.pathname}${query}`);
    }

    return (
        <div className='w-full flex justify-end p-3 mt-auto'>
            <Pagination
                size='small'
                color='primary'
                count={data.lastPage}
                page={+(page || 1)}
                onChange={handleChangePage}
            />
        </div>
    )
}

export default TablePagination