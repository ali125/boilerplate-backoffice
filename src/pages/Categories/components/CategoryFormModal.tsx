import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Modal from '@/components/base/Modal';
import Button from '@/components/base/Button';
import InputController from '@/components/base/Form/InputController';
import { createLocale } from '@/config/translation/i18n';
import { useCreateCategoryMutation, useGetCategoryQuery, useLazyGetCategoriesQuery, useUpdateCategoryMutation } from '@/redux/apiSlice/categoriesSlice';
import { convertQueryToString } from '@/utils/helpers/string';
import useDebounce from '@/utils/hooks/useDebounce';
import { Category, CategoryFormValues } from '@/@types/category.type';
import AutocompleteController from '@/components/base/Form/AutocompleteController';

type Props = {
    open: boolean,
    id?: string | null;
    onClose: () => void,
}

const CategoryFormModal: React.FC<Props> = ({ open, id, onClose }) => {
    const [searchCategoryText, setSearchCategoryText] = useState<string>("");
    const [categories, setCategories] = useState<Category[]>([]);
    const { t } = useTranslation();
    
    const [getCategories, { isLoading: categoryLoading }] = useLazyGetCategoriesQuery();
    const { data, isLoading } = useGetCategoryQuery({ id: id! }, { skip: !id });
    const { control, reset, handleSubmit } = useForm<CategoryFormValues>({ values: data });
    
    const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
    const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

    const retrieveCategories = useCallback(async (text: string = "") => {
        try {
            const query = convertQueryToString({
                page: 1,
                perPage: 20,
                filters: text ? `title|include|${text}`: undefined
            });
            const response = await getCategories({ query });
            setCategories((response?.data as any)?.data || []);
        } catch (err) {
            console.log(err);
        }
    }, []);

    const debouncedSearchValue = useDebounce(searchCategoryText, 500);

    useEffect(() => {
        if (open) {
            retrieveCategories(searchCategoryText);
        }
    }, [debouncedSearchValue, retrieveCategories, open]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            let response: any;
            if (id) {
                response = await updateCategory({ id, ...data });
            } else {
                response = await createCategory(data);
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

    const categoryOptions = useMemo(() => categories.map((cat) => ({ label: cat.title, value: cat.id })), [categories]);

    const isSubmitting = useMemo(() => isCreating || isUpdating, [isCreating, isUpdating]);

    return (
        <Modal
            title={t("category.newCategory")}
            open={open}
            isLoading={isLoading}
            footer={(
                <>
                    <Button type='submit' form="categoryForm" isLoading={isSubmitting}>{t("general.save")}</Button>
                    <Button variant='outlined' onClick={handleClose}>{t("general.close")}</Button>
                </>
            )}
            onClose={handleClose}
        >
            <form id="categoryForm" className="flex flex-col gap-3" onSubmit={onSubmit}>
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

                <AutocompleteController
                    control={control}
                    name="parentId"
                    className="flex-1"
                    label={t("category.parent")}
                    placeholder={t("category.selectParent")}
                    loading={categoryLoading}
                    options={categoryOptions}
                    onInputChange={(val) => setSearchCategoryText(val as string)}
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

export default CategoryFormModal