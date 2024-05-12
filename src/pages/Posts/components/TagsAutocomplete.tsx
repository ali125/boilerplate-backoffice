import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tag, TagBaseType } from '@/@types/tag.type';
import AutocompleteController from '@/components/base/Form/AutocompleteController';
import { useLazyGetTagsQuery } from '@/redux/apiSlice/tagsSlice';
import { convertQueryToString } from '@/utils/helpers/string';
import useDebounce from '@/utils/hooks/useDebounce';

interface Props {
    control: any;
    data?: TagBaseType[];
}

const TagsAutocomplete: React.FC<Props> = ({ control, data }) => {
    const [searchTagText, setSearchTagText] = useState<string>("");
    const [tags, setTags] = useState<Tag[]>([]);
    const [getTags, { isLoading: tagLoading }] = useLazyGetTagsQuery();

    const { t } = useTranslation();

    const retrieveTags = useCallback(async (text: string = "") => {
        try {
            const query = convertQueryToString({
                page: 1,
                perPage: 20,
                filters: text ? `title|include|${text}`: undefined
            });
            const response = await getTags({ query });
            setTags((response?.data as any)?.data || []);
        } catch (err) {
            console.log(err);
        }
    }, []);

    const debouncedSearchTagValue = useDebounce(searchTagText, 500);

    useEffect(() => {
        retrieveTags(searchTagText);
    }, [debouncedSearchTagValue, retrieveTags]);

    const tagOptions = useMemo(() => tags.map((tag) => ({ label: tag.title, value: tag.id, id: tag.id })), [tags]);

    const defaultValue = useMemo(() => {
        return (data || []).map((item) => ({ label: item.title, value: item.id }));
    }, [data]);

    return (
        <AutocompleteController
            multiple
            control={control}
            name="tags"
            className="flex-1"
            label={t("post.tag")}
            placeholder={t("post.selectTag")}
            loading={tagLoading}
            options={tagOptions}
            defaultValue={defaultValue}
            onInputChange={(val) => setSearchTagText(val as string)}
        />
    );
}

export default TagsAutocomplete