import React, { useCallback, useMemo, useState } from 'react'
import PageHead from '@/components/common/PageHead'
import Table from '@/components/common/Table';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Add from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import CategoryFormModal from './components/RoleFormModal';
import { createColumns } from './createColumns';
import useTableQuery from '@/utils/hooks/UseTableQuery/useTableQuery';
import { convertQueryToString } from '@/utils/helpers/string';
import { Category } from '@/@types/category.type';
import { useConfirm } from 'material-ui-confirm';
import { createLocale } from '@/config/translation/i18n';
import { useDeleteRoleMutation, useGetRolesQuery } from '@/redux/apiSlice/rolesSlice';

const Roles: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);
  const { t } = useTranslation();

  const confirm = useConfirm();
  const queryObj = useTableQuery();

  const queryParam = useMemo(() => convertQueryToString(queryObj), [queryObj]);

  const [deleteCategory, { isLoading: deleteLoading }] = useDeleteRoleMutation();
  const { data, isLoading } = useGetRolesQuery({ query: queryParam });

  const handleDeleteCategory = useCallback(async (category: Category) => {
    try {
      await confirm({
        description: createLocale(t("confirm.deleteDescription"), { field: category.title })
      })
      await deleteCategory(category.id);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const actions = useMemo(() => [
    {
      id: 'edit',
      label: t('general.edit'),
      icon: <Edit className='w-4 h-4' />,
      onClick: (res: Category) => {
        setSelected(res.id);
        setIsOpen(true);
      }
    },
    {
      id: 'delete',
      label: t('general.delete'),
      icon: <Delete className='w-4 h-4' />,
      onClick: (res: Category) => handleDeleteCategory(res)
    },
  ], []);

  const handleClose = useCallback(() => {
    setSelected(null);
    setIsOpen(false);
  }, []);

  return (
    <>
      <PageHead title={t("role.roles")} sub={t("general.list")} />
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
      <CategoryFormModal open={isOpen} id={selected} onClose={handleClose} />
    </>
  )
}

export default Roles;
