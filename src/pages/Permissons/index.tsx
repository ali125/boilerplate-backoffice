import React, { useMemo } from 'react'
import PageHead from '@/components/common/PageHead'
import Table from '@/components/common/Table';
import { useTranslation } from 'react-i18next';
import { createColumns } from './createColumns';
import useTableQuery from '@/utils/hooks/UseTableQuery/useTableQuery';
import { convertQueryToString } from '@/utils/helpers/string';
import { useGetPermissionsQuery } from '@/redux/apiSlice/permissionsSlice';

const Permissions: React.FC = () => {
  const { t } = useTranslation();
  const queryObj = useTableQuery();

  const queryParam = useMemo(() => convertQueryToString(queryObj), [queryObj]);

  const { data, isLoading } = useGetPermissionsQuery({ query: queryParam });

  return (
    <>
      <PageHead title={t("permission.permissions")} sub={t("general.list")} />
      <Table
        isLoading={isLoading}
        data={data}
        head={createColumns(t)}
      />
    </>
  )
}

export default Permissions;
