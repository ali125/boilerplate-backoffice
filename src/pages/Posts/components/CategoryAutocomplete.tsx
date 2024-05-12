import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AutocompleteController from '@/components/base/Form/AutocompleteController';
import { convertQueryToString } from '@/utils/helpers/string';
import useDebounce from '@/utils/hooks/useDebounce';
import { Category, CategoryBaseType } from '@/@types/category.type';
import { useLazyGetCategoriesQuery } from '@/redux/apiSlice/categoriesSlice';

interface Props {
    control: any;
    data?: CategoryBaseType;
}

const CategoryAutocomplete: React.FC<Props> = ({ control, data }) => {
    const [searchCategoryText, setSearchCategoryText] = useState<string>("");
    const [categories, setCategories] = useState<Category[]>([]);

    const [getCategories, { isLoading: categoryLoading }] = useLazyGetCategoriesQuery();

    const { t } = useTranslation();

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
        retrieveCategories(searchCategoryText);
    }, [debouncedSearchValue, retrieveCategories, open]);

    const categoryOptions = useMemo(() => categories.map((cat) => ({ label: cat.title, value: cat.id })), [categories]);

    const defaultValue = useMemo(() => {
        return data && { label: data.title, value: data.id };
    }, [data]);

    return (
        <AutocompleteController
            control={control}
            name="category"
            className="flex-1"
            label={t("post.category")}
            placeholder={t("post.selectCategory")}
            loading={categoryLoading}
            options={categoryOptions}
            defaultValue={defaultValue}
            onInputChange={(val) => setSearchCategoryText(val as string)}
        />
    );
}

export default CategoryAutocomplete