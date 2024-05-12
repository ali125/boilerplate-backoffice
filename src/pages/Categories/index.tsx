import React, { useCallback, useMemo, useState } from 'react'
import PageHead from '@/components/common/PageHead'
import Table from '@/components/common/Table';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Add from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import CategoryFormModal from './components/CategoryFormModal';
import { createColumns } from './createColumns';
import useTableQuery from '@/utils/hooks/UseTableQuery/useTableQuery';
import { convertQueryToString } from '@/utils/helpers/string';
import { useDeleteCategoryMutation, useGetCategoriesQuery } from '@/redux/apiSlice/categoriesSlice';
import { Category } from '@/@types/category.type';
import { useConfirm } from 'material-ui-confirm';
import { createLocale } from '@/config/translation/i18n';
import { useAbility } from '@casl/react';
import { AbilityContext } from '@/utils/providers/CanAbilityProvider';
import { PermissionActions, PermissionModules } from '@/@types/permission.type';

const Categories: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);

  const ability = useAbility(AbilityContext);
  const { t } = useTranslation();

  const confirm = useConfirm();
  const queryObj = useTableQuery();

  const queryParam = useMemo(() => convertQueryToString(queryObj), [queryObj]);

  const [deleteCategory, { isLoading: deleteLoading }] = useDeleteCategoryMutation();
  const { data, isLoading } = useGetCategoriesQuery({ query: queryParam });

  const handleDelete = useCallback(async (category: Category) => {
    try {
      await confirm({
        description: createLocale(t("confirm.deleteDescription"), { field: category.title })
      })
      await deleteCategory(category.id);
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
    if (ability.can(PermissionActions.Update, PermissionModules.Category)) {
      actionList.push({
        id: 'edit',
        label: t('general.edit'),
        icon: <Edit className='w-4 h-4' />,
        onClick: (res: Category) => {
          setSelected(res.id);
          setIsOpen(true);
        }
      });
    }
    if (ability.can(PermissionActions.Delete, PermissionModules.Category)) {
      actionList.push({
        id: 'delete',
        label: t('general.delete'),
        icon: <Delete className='w-4 h-4' />,
        onClick: (res: Category) => handleDelete(res)
      });
    }
    return actionList;
  }, [ability]);

  const extraControl = useMemo(() => {
    if (ability.can(PermissionActions.Create, PermissionModules.Category)) {
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
      <PageHead title={t("category.categories")} sub={t("general.list")} />
      <Table
        isLoading={isLoading || deleteLoading}
        data={data}
        head={createColumns(t)}
        actions={actions}
        extraControl={extraControl}
      />
      {isOpen && <CategoryFormModal id={selected} onClose={handleClose} />}
    </>
  )
}

export default Categories;
