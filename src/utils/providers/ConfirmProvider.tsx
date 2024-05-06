import React from "react";
import { ConfirmProvider as MUIConfirmProvider } from "material-ui-confirm";
import { useTranslation } from "react-i18next";

const ConfirmProvider: React.FC<WithChildren> = ({ children }) => {
  const { t } = useTranslation();
  return (
    <MUIConfirmProvider
      defaultOptions={{
        title: t("confirm.title"),
        cancellationText: t("confirm.cancel"),
        confirmationText: t("confirm.ok"),
        confirmationButtonProps: {
          color: "primary",
          variant: "contained",
          style: {
            fontSize: 16,
            padding: '6px 26px',
            lineHeight: 1.5,
            borderRadius: 100,
          }
        },
        cancellationButtonProps: {
          variant: "outlined",
          style: {
            fontSize: 16,
            padding: '6px 26px',
            lineHeight: 1.5,
            borderRadius: 100,
          }
        },
        dialogActionsProps: {
          className: "flex p-5 gap-3",
        },
        dialogProps: {
          PaperProps: {
            sx: {
              borderRadius: "0.8rem",
              width: "unset",
              minWidth: "400px",
            },
          },
        },
      }}
    >
      {children}
    </MUIConfirmProvider>
  );
};

export default ConfirmProvider;
