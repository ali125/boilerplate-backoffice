import React from 'react'
import { useTranslation } from 'react-i18next';
import InputController from '@/components/base/Form/InputController';
import { SwitchController } from '@/components/base/Form/SwitchController';
import { createLocale } from '@/config/translation/i18n';

interface Props {
    control: any
}

const RoleInformation: React.FC<Props> = ({ control }) => {
    const { t } = useTranslation();
    return (
        <>
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
                multiline
                rows={4}
                control={control}
                name="description"
                label={t("general.description")}
                placeholder={t("general.enterDescription")}
            />

            <SwitchController control={control} name="superAdmin" label={t('role.superAdmin')} />
        </>
    );
}

export default RoleInformation