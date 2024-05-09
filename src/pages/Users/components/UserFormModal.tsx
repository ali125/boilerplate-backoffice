import React, { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Modal from '@/components/base/Modal';
import Button from '@/components/base/Button';
import InputController from '@/components/base/Form/InputController';
import { createLocale } from '@/config/translation/i18n';
import { useCreateUserMutation, useGetUserQuery, useUpdateUserMutation } from '@/redux/apiSlice/usersSlice';
import { UserFormValues } from '@/@types/user.type';
import SelectController from '@/components/base/Form/SelectController';
import { useGetRolesQuery } from '@/redux/apiSlice/rolesSlice';
import { convertQueryToString } from '@/utils/helpers/string';

type Props = {
    open: boolean,
    id?: string | null;
    onClose: () => void,
}

const UserFormModal: React.FC<Props> = ({ open, id, onClose }) => {
    const { t } = useTranslation();
    const { data, isLoading } = useGetUserQuery({ id: id! }, { skip: !id });
    const { control, reset, handleSubmit } = useForm<UserFormValues>({ values: data  });
    
    const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

    const { data: roles } = useGetRolesQuery({ query: convertQueryToString({ perPage: 50 })});

    const onSubmit = handleSubmit(async (data) => {
        try {
            let response: any;
            if (id) {
                response = await updateUser({ id, ...data });
            } else {
                response = await createUser(data);
            }
            if (response?.data) {
                handleClose();
            }
        } catch (err) {
            console.log(err);
        }
    });

    const handleClose = useCallback(() => {
        reset();
        onClose();
    }, [onClose]);

    const isSubmitting = useMemo(() => isCreating || isUpdating, [isCreating, isUpdating]);

    const roleOptions = useMemo(() => (roles?.data || []).map((role) => ({ label: role.title, value: role.id })), [roles]);

    return (
        <Modal
            title={t("user.newUser")}
            open={open}
            isLoading={isLoading}
            footer={(
                <>
                    <Button type='submit' form="userForm" isLoading={isSubmitting}>{t("general.save")}</Button>
                    <Button variant='outlined' onClick={handleClose}>{t("general.close")}</Button>
                </>
            )}
            onClose={handleClose}
        >
            <form id="userForm" className="flex flex-col gap-3" onSubmit={onSubmit}>
                <InputController
                    control={control}
                    name="firstName"
                    label={t("user.firstName")}
                    placeholder={t("user.enterFirstName")}
                    rules={{
                        required: createLocale(t("errors.required"), { field: t("user.firstName") }),
                    }}
                />
                <InputController
                    control={control}
                    name="lastName"
                    label={t("user.lastName")}
                    placeholder={t("user.enterLastName")}
                    rules={{
                        required: createLocale(t("errors.required"), { field: t("user.lastName") }),
                    }}
                />
                <InputController
                    control={control}
                    type="email"
                    name="email"
                    label={t("user.email")}
                    placeholder={t("user.enterEmail")}
                    rules={{
                        required: createLocale(t("errors.required"), { field: t("user.email") }),
                    }}
                />
                <InputController
                    control={control}
                    type="tel"
                    name="mobile"
                    label={t("user.mobile")}
                    placeholder={t("user.enterMobile")}
                />
                <SelectController
                    control={control}
                    name="roleId"
                    label={t("user.role")}
                    placeholder={t("user.enterRole")}
                    options={roleOptions}
                />
                {!id && (
                    <InputController
                        control={control}
                        type="password"
                        name="password"
                        label={t("user.password")}
                        placeholder={t("user.enterPassword")}
                        rules={{
                            required: createLocale(t("errors.required"), { field: t("user.password") }),
                            minLength: {
                                message: createLocale(t("errors.minLength"), { value: 5 }),
                                value: 5
                            },
                            maxLength: {
                                message: createLocale(t("errors.maxLength"), { value: 15 }),
                                value: 15
                            },
                        }}
                    />
                )}
            </form>
        </Modal>
    );
}

export default UserFormModal