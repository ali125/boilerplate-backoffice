import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import InputController from '@/components/base/Form/InputController';
import { createLocale } from '@/config/translation/i18n';
import { ProfileFormValues } from '@/@types/auth.type';
import { useGetProfileQuery, useUpdateProfileMutation } from '@/redux/apiSlice/authSlice';
import { convertToFormData } from '@/utils/helpers/form';
import { showMessage } from '@/utils/helpers/showMessage';
import { CircularProgress } from '@mui/material';
import Button from '@/components/base/Button';
import ImageSelectorController from '@/components/common/ImageSelector/ImageSelectorController';

const ProfileForm: React.FC = () => {
    const { control, reset, handleSubmit } = useForm<ProfileFormValues>();
    const { t } = useTranslation();

    const { data, isLoading } = useGetProfileQuery();
    const [updateProfile, { error, isLoading: isSubmitting }] = useUpdateProfileMutation();

    const onSubmit = handleSubmit(async (data) => {
        let body: any = { ...data };

        if (data.avatar) {
            body = convertToFormData({ ...body, avatar: data.avatar });
        }

        try {
            const response: any = await updateProfile({ body });
            if (response?.data) {
                showMessage('success', 'success')
            }
        } catch (err) {
            console.log(err);
        }
    });

    const handleReset = useCallback(() => {
        reset();
    }, [reset]);

    const errors = useMemo(() => (error as any)?.data, [error]);

    return isLoading ? (
        <section className="flex items-center justify-center w-full h-full">
            <CircularProgress />
        </section>
    ) : (
        <form className='flex flex-col gap-3 w-full flex-1' onSubmit={onSubmit}>
            <div className="flex gap-5">
                <div className='w-[17rem]'>
                    <ImageSelectorController
                        control={control}
                        name="avatar"
                        image={data?.avatarUrl ? `${import.meta.env.VITE_BASE_URL}${data?.avatarUrl}` : data?.avatarUrl}
                        imageClassName='max-w-full min-h-[18rem]'
                        wrapperClassName="relative max-w-full"
                        btnGroupClassNames='absolute bottom-0 p-2 left-0 bg-[rgba(0,0,0,0.6)] w-full'
                    />
                </div>
                <div className='w-[calc(100%-17rem)] flex flex-col gap-3'>
                    <InputController
                        control={control}
                        name="firstName"
                        defaultValue={data?.firstName}
                        label={t("user.firstName")}
                        placeholder={t("user.enterFirstName")}
                        errorMessage={errors?.firstName?.[0]}
                        rules={{
                            required: createLocale(t("errors.required"), { field: t("user.firstName") }),
                        }}
                    />

                    <InputController
                        control={control}
                        name="lastName"
                        defaultValue={data?.lastName}
                        label={t("user.lastName")}
                        placeholder={t("user.entelLastName")}
                        errorMessage={errors?.lastName?.[0]}
                        rules={{
                            required: createLocale(t("errors.required"), { field: t("user.lastName") }),
                        }}
                    />

                    <InputController
                        control={control}
                        name="email"
                        type="email"
                        label={t("user.email")}
                        defaultValue={data?.email}
                        placeholder={t("user.enterEmail")}
                        errorMessage={errors?.email?.[0]}
                        rules={{
                            required: createLocale(t("errors.required"), { field: t("user.email") }),
                            pattern: {
                            message: t("errors.emailPattern"),
                            value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
                            },
                        }}
                    />

                    <InputController
                        control={control}
                        name="mobile"
                        type="tel"
                        label={t("user.mobile")}
                        errorMessage={errors?.mobile?.[0]}
                        defaultValue={data?.mobile}
                        placeholder={t("user.enterMobile")}
                    />
                </div>
            </div>

            <InputController
                multiline
                rows={4}
                control={control}
                name="about"
                defaultValue={data?.about}
                label={t("user.about")}
                placeholder={t("user.enterAbout")}
                errorMessage={errors?.about?.[0]}
            />

            <div className='flex items-center gap-3 pt-3 mt-auto border-t'>
                <Button type='submit' isLoading={isSubmitting}>{t("general.save")}</Button>
                <Button type='reset' variant='outlined' onClick={handleReset}>{t("general.reset")}</Button>
            </div>
        </form>
    );
}

export default ProfileForm;