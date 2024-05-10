import React, { useCallback, useMemo, useState } from 'react'
import PageHead from '@/components/common/PageHead'
import Table from '@/components/common/Table';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Add from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import TagFormModal from './components/TagFormModal';
import { createColumns } from './createColumns';
import useTableQuery from '@/utils/hooks/UseTableQuery/useTableQuery';
import { convertQueryToString } from '@/utils/helpers/string';
import { useDeleteTagMutation, useGetTagsQuery } from '@/redux/apiSlice/tagsSlice';
import { useConfirm } from 'material-ui-confirm';
import { createLocale } from '@/config/translation/i18n';
import { Tag } from '@/@types/tag.type';

const Tags: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);
  const { t } = useTranslation();

  const confirm = useConfirm();
  const queryObj = useTableQuery();

  const queryParam = useMemo(() => convertQueryToString(queryObj), [queryObj]);

  const [deleteTag, { isLoading: deleteLoading }] = useDeleteTagMutation();
  const { data, isLoading } = useGetTagsQuery({ query: queryParam });

  const handleDeleteTag = useCallback(async (tag: Tag) => {
    try {
      await confirm({
        description: createLocale(t("confirm.deleteDescription"), { field: tag.title })
      })
      await deleteTag(tag.id);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const actions = useMemo(() => [
    {
      id: 'edit',
      label: t('general.edit'),
      icon: <Edit className='w-4 h-4' />,
      onClick: (res: Tag) => {
        setSelected(res.id);
        setIsOpen(true);
      }
    },
    {
      id: 'delete',
      label: t('general.delete'),
      icon: <Delete className='w-4 h-4' />,
      onClick: (res: Tag) => handleDeleteTag(res)
    },
  ], []);

  const handleClose = useCallback(() => {
    setSelected(null);
    setIsOpen(false);
  }, []);

  return (
    <>
      <PageHead title={t("tag.tags")} sub={t("general.list")} />
      <Table
        isLoading={isLoading || deleteLoading}
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
      <TagFormModal open={isOpen} id={selected} onClose={handleClose} />
    </>
  )
}

export default Tags;
