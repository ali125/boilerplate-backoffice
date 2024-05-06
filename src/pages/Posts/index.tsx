import React, { useMemo, useState } from 'react'
import PageHead from '@/components/common/PageHead'
import Table from '@/components/common/Table';
import { Edit } from '@mui/icons-material';
import Add from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import PostFormModal from './components/PostFormModal';
import { useGetPostsQuery } from '@/redux/apiSlice/postsSlice';
import { createColumns } from './createColumns';
import useTableQuery from '@/utils/hooks/UseTableQuery/useTableQuery';
import { convertQueryToString } from '@/utils/helpers/string';

const actions = [
  {
    id: 'edit',
    label: "edit",
    icon: <Edit className='w-4 h-4' />,
    onClick: () => {}
  },
];

const Posts: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const queryObj = useTableQuery();

  const queryParam = useMemo(() => convertQueryToString(queryObj), [queryObj]);

  const { data, isLoading } = useGetPostsQuery({ query: queryParam });

  return (
    <>
      <PageHead title={t("post.posts")} sub={t("general.list")} />
      <Table
        isLoading={isLoading}
        data={data}
        head={createColumns(t)}
        actions={actions}
        extraControl={[
          {
            id: "add",
            label: t("general.add"),
            icon: <Add />,
            onClick: () => setIsOpen(true)
          }
        ]}
      />
      <PostFormModal open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export default Posts;
