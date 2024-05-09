import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Tabs from '@mui/material/Tabs';
import Modal from '@/components/base/Modal';
import Button from '@/components/base/Button';
import { RoleFormValues } from '@/@types/role.type';
import { useCreateRoleMutation, useGetRoleQuery, useUpdateRoleMutation } from '@/redux/apiSlice/rolesSlice';
import Tab from '@/components/base/Tab';
import TabPanel from '@/components/base/TabPanel';
import RoleInformation from './RoleInformation';
import RolePermissions from './RolePermissions';

type Props = {
    open: boolean,
    id?: string | null;
    onClose: () => void,
}

enum TAB_TYPE { INFO, PERMISSIONS }

const TabList = [
    {
      id: TAB_TYPE.INFO,
      label: "Information",
    },
    {
      id: TAB_TYPE.PERMISSIONS,
      label: "Permissions",
    },
];

const RoleFormModal: React.FC<Props> = ({ open, id, onClose }) => {
    const [selectedPermissionIds, setSelectedPermissionIds] = useState<string[]>([]);
    const [selectedTab, setSelectedTab] = useState<number>(TAB_TYPE.INFO);
    const { t } = useTranslation();

    const { data, isLoading } = useGetRoleQuery({ id: id! }, { skip: !id });
    const { control, reset, handleSubmit } = useForm<RoleFormValues>({ values: data ? { ...data, permissions: selectedPermissionIds }: undefined });
    
    const [createRole, { isLoading: isCreating }] = useCreateRoleMutation();
    const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();

    useEffect(() => {
        if (data) {
            setSelectedPermissionIds(data.permissions.map((permission) => permission.id));
        }
    }, [data]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            let response: any;
            if (id) {
                response = await updateRole({ id, ...data, permissions: selectedPermissionIds });
            } else {
                response = await createRole({ ...data, permissions: selectedPermissionIds });
            }
            if (response?.data) {
                handleClose();
            }
        } catch (err) {
            console.log(err);
        }
    });

    const handleTabChange = useCallback((_event: React.SyntheticEvent, value: number) => {
        setSelectedTab(value);
      }, []);

    const handleClose = useCallback(() => {
        setSelectedTab(TAB_TYPE.INFO);
        reset();
        onClose();
    }, [onClose]);

    const isSubmitting = useMemo(() => isCreating || isUpdating, [isCreating, isUpdating]);

    return (
        <Modal
            title={t("role.newRole")}
            open={open}
            isLoading={isLoading}
            footer={(
                <>
                    <Button type='submit' form="roleForm" isLoading={isSubmitting}>{t("general.save")}</Button>
                    <Button variant='outlined' onClick={handleClose}>{t("general.close")}</Button>
                </>
            )}
            onClose={handleClose}
        >
            <Tabs onChange={handleTabChange} value={selectedTab} className="min-h-[36px]">
                {TabList.map(i => (
                    <Tab
                        key={i.id}
                        value={i.id}
                        label={i.label}
                        className="flex-1 max-w-none min-h-[36px] p-0"
                        sx={{ fontSize: "small" }}
                    />
                ))}
            </Tabs>
            <form id="roleForm" className="flex flex-col gap-3 mt-3" onSubmit={onSubmit}>
                <TabPanel index={TAB_TYPE.INFO} value={selectedTab}>
                    <RoleInformation control={control} />
                </TabPanel>
                <TabPanel index={TAB_TYPE.PERMISSIONS} value={selectedTab}>
                    <RolePermissions selectedIds={selectedPermissionIds} onSelectedIds={setSelectedPermissionIds} />
                </TabPanel>
            </form>
        </Modal>
    );
}

export default RoleFormModal