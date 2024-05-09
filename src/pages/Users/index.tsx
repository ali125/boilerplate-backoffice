import React, { useCallback, useMemo, useState } from 'react'
import { useConfirm } from 'material-ui-confirm';
import PageHead from '@/components/common/PageHead'
import Table from '@/components/common/Table';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Add from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import UserFormModal from './components/UserFormModal';
import { createColumns } from './createColumns';
import useTableQuery from '@/utils/hooks/UseTableQuery/useTableQuery';
import { convertQueryToString } from '@/utils/helpers/string';
import { createLocale } from '@/config/translation/i18n';
import { useDeleteUserMutation, useGetUsersQuery } from '@/redux/apiSlice/usersSlice';
import { UserItem } from '@/@types/user.type';

const Users: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);
  const { t } = useTranslation();

  const confirm = useConfirm();
  const queryObj = useTableQuery();

  const queryParam = useMemo(() => convertQueryToString(queryObj), [queryObj]);

  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();
  const { data, isLoading } = useGetUsersQuery({ query: queryParam });

  const handleDeleteUser = useCallback(async (user: UserItem) => {
    try {
      await confirm({
        description: createLocale(t("confirm.deleteDescription"), { field: user.fullName })
      })
      await deleteUser(user.id);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const actions = useMemo(() => [
    {
      id: 'edit',
      label: t('general.edit'),
      icon: <Edit className='w-4 h-4' />,
      onClick: (res: UserItem) => {
        setSelected(res.id);
        setIsOpen(true);
      }
    },
    {
      id: 'delete',
      label: t('general.delete'),
      icon: <Delete className='w-4 h-4' />,
      onClick: (res: UserItem) => handleDeleteUser(res)
    },
  ], []);

  const handleClose = useCallback(() => {
    setSelected(null);
    setIsOpen(false);
  }, []);

  return (
    <>
      <PageHead title={t("user.users")} sub={t("general.list")} />
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
      <UserFormModal open={isOpen} id={selected} onClose={handleClose} />
    </>
  )
}

export default Users;
