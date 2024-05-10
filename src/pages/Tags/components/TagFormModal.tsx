import React, { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Modal from '@/components/base/Modal';
import Button from '@/components/base/Button';
import InputController from '@/components/base/Form/InputController';
import { createLocale } from '@/config/translation/i18n';
import { TagFormValues } from '@/@types/tag.type';
import { useCreateTagMutation, useGetTagQuery, useUpdateTagMutation } from '@/redux/apiSlice/tagsSlice';

type Props = {
    open: boolean,
    id?: string | null;
    onClose: () => void,
}

const TagFormModal: React.FC<Props> = ({ open, id, onClose }) => {
    const { t } = useTranslation();
    
    const { data, isLoading } = useGetTagQuery({ id: id! }, { skip: !id });
    const { control, reset, handleSubmit } = useForm<TagFormValues>({ values: data });
    
    const [createTag, { isLoading: isCreating }] = useCreateTagMutation();
    const [updateTag, { isLoading: isUpdating }] = useUpdateTagMutation();

    const onSubmit = handleSubmit(async (data) => {
        try {
            let response: any;
            if (id) {
                response = await updateTag({ id, ...data });
            } else {
                response = await createTag(data);
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

    return (
        <Modal
            title={t("tag.newTag")}
            open={open}
            isLoading={isLoading}
            footer={(
                <>
                    <Button type='submit' form="tagForm" isLoading={isSubmitting}>{t("general.save")}</Button>
                    <Button variant='outlined' onClick={handleClose}>{t("general.close")}</Button>
                </>
            )}
            onClose={handleClose}
        >
            <form id="tagForm" className="flex flex-col gap-3" onSubmit={onSubmit}>
                <InputController
                    control={control}
                    name="title"
                    label={t("general.title")}
                    placeholder={t("general.enterTitle")}
                    rules={{
                        required: createLocale(t("errors.required"), { field: t("general.title") }),
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
                <InputController
                    control={control}
                    name="slug"
                    label={t("category.slug")}
                    placeholder={t("category.enterSlug")}
                />

                <InputController
                    multiline
                    rows={4}
                    control={control}
                    name="description"
                    label={t("general.description")}
                    placeholder={t("general.enterDescription")}
                />
                
            </form>
        </Modal>
    );
}

export default TagFormModal