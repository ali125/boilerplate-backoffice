import React, { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Modal from '@/components/base/Modal';
import Button from '@/components/base/Button';
import InputController from '@/components/base/Form/InputController';
import { createLocale } from '@/config/translation/i18n';
import { useCreatePostMutation, useGetPostQuery, useUpdatePostMutation } from '@/redux/apiSlice/postsSlice';
import { PostFormValues } from '@/@types/post.type';
import TagsAutocomplete from './TagsAutocomplete';
import CategoryAutocomplete from './CategoryAutocomplete';
import { FileSelectorController } from '@/components/base/Form/FileSelectorController/file-selector-controller.component';
import { convertToFormData } from '@/utils/helpers/form';

type Props = {
    id?: string | null;
    onClose: () => void;
}

const PostFormModal: React.FC<Props> = ({ id, onClose }) => {
    const { t } = useTranslation();
    
    const { data, isLoading } = useGetPostQuery({ id: id! }, { skip: !id });
    const { control, handleSubmit } = useForm<PostFormValues>();
    
    const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
    const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

    const onSubmit = handleSubmit(async (data) => {
        let body: any = {
            ...data,
            categoryId: data.category?.value,
            tagIds: (data?.tags || []).map((tag) => tag.value)
        }
        if (data.category) delete (body as any).category;
        if (data.tags) delete (body as any).tags;

        if (data.image) {
            body = convertToFormData({ ...body, image: data.image[0] });
        }

        try {
            let response: any;
            if (id) {
                response = await updatePost({ id, body });
            } else {
                response = await createPost({ body });
            }
            if (response?.data) {
                handleClose();
            }
        } catch (err) {
            console.log(err);
        }
    });

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    const isSubmitting = useMemo(() => isCreating || isUpdating, [isCreating, isUpdating]);

    return (
        <Modal
            open
            title={id ? t("post.editPost") : t("post.newPost")}
            isLoading={isLoading}
            footer={(
                <>
                    <Button type='submit' form="postForm" isLoading={isSubmitting}>{t("general.save")}</Button>
                    <Button variant='outlined' onClick={handleClose}>{t("general.close")}</Button>
                </>
            )}
            onClose={handleClose}
        >
            <form id="postForm" className="flex flex-col gap-3" onSubmit={onSubmit}>
                <FileSelectorController
                    control={control}
                    name="image"
                    label={t("post.image")}
                />
                <InputController
                    control={control}
                    name="title"
                    label={t("general.title")}
                    placeholder={t("general.enterTitle")}
                    defaultValue={data?.title}
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
                    defaultValue={data?.slug}
                />

                <CategoryAutocomplete control={control} data={data?.category} />

                <TagsAutocomplete control={control} data={data?.tags} />

                <InputController
                    multiline
                    rows={4}
                    control={control}
                    name="description"
                    label={t("general.description")}
                    placeholder={t("general.enterDescription")}
                    defaultValue={data?.description}
                />
            </form>
        </Modal>
    );
}

export default PostFormModal