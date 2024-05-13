import React, { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Modal from '@/components/base/Modal';
import Button from '@/components/base/Button';
import InputController from '@/components/base/Form/InputController';
import { useCreatePostMutation, useGetPostQuery, useUpdatePostMutation } from '@/redux/apiSlice/postsSlice';
import { PostFormValues, PostStatus } from '@/@types/post.type';
import TagsAutocomplete from './TagsAutocomplete';
import CategoryAutocomplete from './CategoryAutocomplete';
import { FileSelectorController } from '@/components/base/Form/FileSelectorController';
import { convertToFormData } from '@/utils/helpers/form';
import { SwitchController } from '@/components/base/Form/SwitchController';
import { createLocale } from '@/config/translation/i18n';

type Props = {
    id?: string | null;
    onClose: () => void;
}

const PostFormModal: React.FC<Props> = ({ id, onClose }) => {
    const { t } = useTranslation();
    
    const { data, isLoading } = useGetPostQuery({ id: id! }, { skip: !id });
    const { control, handleSubmit } = useForm<PostFormValues>();
    
    const [createPost, { isLoading: isCreating, error }] = useCreatePostMutation();
    const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

    const onSubmit = handleSubmit(async (data) => {
        let body: any = {
            ...data,
            isPublish: String(data?.isPublish || false),
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

    const errors = useMemo(() => (error as any)?.data, [error]);

    console.log('errors', errors);

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
                    accept="image/*"
                    label={t("post.image")}
                    errorMessage={errors?.image?.[0]}
                />
                <InputController
                    control={control}
                    name="title"
                    label={t("general.title")}
                    placeholder={t("general.enterTitle")}
                    defaultValue={data?.title}
                    errorMessage={errors?.title?.[0]}
                    rules={{
                        required: createLocale(t("errors.required"), { field: t("general.title") }),
                        minLength: {
                            message: createLocale(t("errors.minLength"), { value: 5 }),
                            value: 5
                        },
                        maxLength: {
                            message: createLocale(t("errors.maxLength"), { value: 50 }),
                            value: 50
                        },
                    }}
                />

                <InputController
                    control={control}
                    name="slug"
                    label={t("post.slug")}
                    placeholder={t("post.enterSlug")}
                    defaultValue={data?.slug}
                    errorMessage={errors?.slug?.[0]}
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
                    errorMessage={errors?.description?.[0]}
                />

                <SwitchController
                    control={control}
                    name="isPublish"
                    label={t("post.isPublish")}
                    defaultValue={data?.status === PostStatus.PUBLISHED || false}
                 />
            </form>
        </Modal>
    );
}

export default PostFormModal