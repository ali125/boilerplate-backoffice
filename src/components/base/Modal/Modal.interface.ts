import { ReactNode } from "react";

export type MODAL_SIZES = "full" | "large" | "medium" | "small" | "auto";

export type ModalProps = {
    id?: string,
    title: string | ReactNode,
    children: ReactNode,
    footer?: ReactNode,
    open: boolean,
    size?: MODAL_SIZES,
    onClose: () => void
};
