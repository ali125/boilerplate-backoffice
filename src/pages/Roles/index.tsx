import React, { useCallback, useMemo, useState } from 'react'
import { useConfirm } from 'material-ui-confirm';
import PageHead from '@/components/common/PageHead'
import Table from '@/components/common/Table';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Add from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import RoleFormModal from './components/RoleFormModal';
import { createColumns } from './createColumns';
import useTableQuery from '@/utils/hooks/UseTableQuery/useTableQuery';
import { convertQueryToString } from '@/utils/helpers/string';
import { createLocale } from '@/config/translation/i18n';
import { useDeleteRoleMutation, useGetRolesQuery } from '@/redux/apiSlice/rolesSlice';
import { Role } from '@/@types/role.type';
import { useAbility } from '@casl/react';
import { AbilityContext } from '@/utils/providers/CanAbilityProvider';
import { PermissionActions, PermissionModules } from '@/@types/permission.type';

const Roles: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);

  const ability = useAbility(AbilityContext);
  const { t } = useTranslation();

  const confirm = useConfirm();
  const queryObj = useTableQuery();

  const queryParam = useMemo(() => convertQueryToString(queryObj), [queryObj]);

  const [deleteRole, { isLoading: deleteLoading }] = useDeleteRoleMutation();
  const { data, isLoading } = useGetRolesQuery({ query: queryParam });

  const handleDeleteRole = useCallback(async (role: Role) => {
    try {
      await confirm({
        description: createLocale(t("confirm.deleteDescription"), { field: role.title })
      })
      await deleteRole(role.id);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const actions = useMemo(() => {
    const actionList = [];
    if (ability.can(PermissionActions.Update, PermissionModules.Role)) {
      actionList.push({
        id: 'edit',
        label: t('general.edit'),
        icon: <Edit className='w-4 h-4' />,
        onClick: (res: Role) => {
          setSelected(res.id);
          setIsOpen(true);
        }
      });
    }
    if (ability.can(PermissionActions.Delete, PermissionModules.Role)) {
      actionList.push({
        id: 'delete',
        label: t('general.delete'),
        icon: <Delete className='w-4 h-4' />,
        onClick: (res: Role) => handleDeleteRole(res)
      });
    }
    return actionList;
  }, [ability]);

  const handleClose = useCallback(() => {
    setSelected(null);
    setIsOpen(false);
  }, []);

  const extraControl = useMemo(() => {
    if (ability.can(PermissionActions.Create, PermissionModules.Role)) {
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
      <PageHead title={t("role.roles")} sub={t("general.list")} />
      <Table
        isLoading={isLoading || deleteLoading}
        data={data}
        head={createColumns(t)}
        actions={actions}
        extraControl={extraControl}
      />
      <RoleFormModal open={isOpen} id={selected} onClose={handleClose} />
    </>
  )
}

export default Roles;
