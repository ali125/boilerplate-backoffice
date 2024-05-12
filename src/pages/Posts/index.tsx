import React, { useCallback, useMemo, useState } from 'react'
import PageHead from '@/components/common/PageHead'
import Table from '@/components/common/Table';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import PostFormModal from './components/PostFormModal';
import { useDeletePostMutation, useGetPostsQuery } from '@/redux/apiSlice/postsSlice';
import { createColumns } from './createColumns';
import useTableQuery from '@/utils/hooks/UseTableQuery/useTableQuery';
import { convertQueryToString } from '@/utils/helpers/string';
import { PermissionActions, PermissionModules } from '@/@types/permission.type';
import { useAbility } from '@casl/react';
import { AbilityContext } from '@/utils/providers/CanAbilityProvider';
import { useConfirm } from 'material-ui-confirm';
import { Post } from '@/@types/post.type';
import { createLocale } from '@/config/translation/i18n';

const Posts: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);

  const ability = useAbility(AbilityContext);
  const { t } = useTranslation();

  const confirm = useConfirm();
  const queryObj = useTableQuery();

  const queryParam = useMemo(() => convertQueryToString(queryObj), [queryObj]);

  const [deletePost, { isLoading: deleteLoading }] = useDeletePostMutation();
  const { data, isLoading } = useGetPostsQuery({ query: queryParam });

  const handleDelete = useCallback(async (category: Post) => {
    try {
      await confirm({
        description: createLocale(t("confirm.deleteDescription"), { field: category.title })
      })
      await deletePost(category.id);
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
    if (ability.can(PermissionActions.Update, PermissionModules.Post)) {
      actionList.push({
        id: 'edit',
        label: t('general.edit'),
        icon: <Edit className='w-4 h-4' />,
        onClick: (res: Post) => {
          setSelected(res.id);
          setIsOpen(true);
        }
      });
    }
    if (ability.can(PermissionActions.Delete, PermissionModules.Post)) {
      actionList.push({
        id: 'delete',
        label: t('general.delete'),
        icon: <Delete className='w-4 h-4' />,
        onClick: (res: Post) => handleDelete(res)
      });
    }
    return actionList;
  }, [ability]);

  const extraControl = useMemo(() => {
    if (ability.can(PermissionActions.Create, PermissionModules.Post)) {
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
      <PageHead title={t("post.posts")} sub={t("general.list")} />
      <Table
        isLoading={isLoading || deleteLoading}
        data={data}
        head={createColumns(t)}
        actions={actions}
        extraControl={extraControl}
      />
      {isOpen && <PostFormModal id={selected} onClose={handleClose} />}
    </>
  )
}

export default Posts;
