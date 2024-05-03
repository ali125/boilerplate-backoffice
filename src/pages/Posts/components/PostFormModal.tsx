import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Modal from '@/components/base/Modal';
import Button from '@/components/base/Button';
import InputController from '@/components/base/Form/InputController';
import SelectController from '@/components/base/Form/SelectController';
import { createLocale } from '@/config/translation/i18n';

type Props = {
    open: boolean,
    onClose: () => void,
}

const PostFormModal: React.FC<Props> = ({ open, onClose }) => {
    const { control, reset, handleSubmit } = useForm();
    const { t } = useTranslation();

    const onSubmit = handleSubmit(() => {
        console.log("submit")
    });

    const handleClose = useCallback(() => {
        reset();
        onClose();
    }, [onClose, reset]);

    return (
        <Modal
            title={t("post.newPost")}
            open={open}
            footer={(
                <>
                    <Button type='submit' form="postForm">{t("general.save")}</Button>
                    <Button variant='outlined' onClick={handleClose}>{t("general.close")}</Button>
                </>
            )}
            onClose={handleClose}
        >
            <form id="postForm" className="flex flex-col gap-3" onSubmit={onSubmit}>
                <InputController
                    control={control}
                    name="title"
                    label={t("post.title")}
                    placeholder={t("post.enterTitle")}
                    rules={{
                        required: createLocale(t("errors.required"), { field: t("post.title") }),
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

                <SelectController
                    control={control}
                    name="category"
                    className="flex-1"
                    label={t("post.category")}
                    placeholder={t("post.selectCategory")}
                    rules={{
                        required: createLocale(t("errors.required"), { field: t("post.category") }),
                        minLength: {
                            message: createLocale(t("errors.minLength"), { value: 5 }),
                            value: 5
                        },
                        maxLength: {
                            message: createLocale(t("errors.maxLength"), { value: 15 }),
                            value: 15
                        },
                    }}
                    options={[
                        { label: "item1", value: "item1" },
                        { label: "item2", value: "item2" },
                        { label: "item3", value: "item3" },
                    ]}
                />
            </form>
        </Modal>
    );
}

export default PostFormModal