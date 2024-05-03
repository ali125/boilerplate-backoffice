import { useMemo } from 'react'
import { PER_PAGE } from '@/config/app.config';
import { useSearchParams } from 'react-router-dom';
import { TableQuery } from './useTableQuery.interface';

type Props = {
  extra?: string[]
}

const useTableQuery = (props?: Props): TableQuery => {
    const [searchParams] = useSearchParams();

    const queries = useMemo(() => {
      const page = +(searchParams.get("page") || 1);
      const sort = searchParams.get("sort") || "";
      const filters = searchParams.get("filters") || "";
      const filterOperator = searchParams.get("filterOperator") || "";
      const [field, order] = sort.split(',');

      const query: TableQuery = {
        page,
        filters,
        filterOperator,
        perPage: PER_PAGE,
      }

      if (field && order) {
        query["sortBy"] = field;
        query["sortOrder"] = order;
      }

      if ((props?.extra || []).length > 0) {
        (props?.extra || []).forEach((queryName) => {
          query[queryName] = searchParams.get(queryName) || "";
        });
      }
      return query;
    }, [searchParams, props?.extra]);

    return queries;
}

export default useTableQuery;
