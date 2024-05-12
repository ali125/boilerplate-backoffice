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
import { useAbility } from '@casl/react';
import { AbilityContext } from '@/utils/providers/CanAbilityProvider';
import { PermissionActions, PermissionModules } from '@/@types/permission.type';

const Users: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);

  const ability = useAbility(AbilityContext);
  const { t } = useTranslation();

  const confirm = useConfirm();
  const queryObj = useTableQuery();

  const queryParam = useMemo(() => convertQueryToString(queryObj), [queryObj]);

  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();
  const { data, isLoading } = useGetUsersQuery({ query: queryParam });

  const handleDelete = useCallback(async (user: UserItem) => {
    try {
      await confirm({
        description: createLocale(t("confirm.deleteDescription"), { field: user.fullName })
      })
      await deleteUser(user.id);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleClose = useCallback(() => {
    setSelected(null);
    setIsOpen(false);
  }, []);

  const actions = useMemo(() => {
    const actionList = [];
    if (ability.can(PermissionActions.Update, PermissionModules.User)) {
      actionList.push({
        id: 'edit',
        label: t('general.edit'),
        icon: <Edit className='w-4 h-4' />,
        onClick: (res: UserItem) => {
          setSelected(res.id);
          setIsOpen(true);
        }
      });
    }
    if (ability.can(PermissionActions.Delete, PermissionModules.User)) {
      actionList.push({
        id: 'delete',
        label: t('general.delete'),
        icon: <Delete className='w-4 h-4' />,
        onClick: (res: UserItem) => handleDelete(res)
      });
    }
    return actionList;
  }, [ability]);

  const extraControl = useMemo(() => {
    if (ability.can(PermissionActions.Create, PermissionModules.User)) {
      return [
        {
          id: "add",
          label: t("general.add"),
          icon: <Add />,
          onClick: () => setIsOpen(true)
        }
      ];
    }
    return [];
  }, [ability]);

  return (
    <>
      <PageHead title={t("user.users")} sub={t("general.list")} />
      <Table
        isLoading={isLoading || deleteLoading}
        data={data}
        head={createColumns(t)}
        actions={actions}
        extraControl={extraControl}
      />
      {isOpen && <UserFormModal id={selected} onClose={handleClose} />}
    </>
  )
}

export default Users;
