import { MODAL_SIZES } from "./Modal.interface";

export const modalContainerStyle = (size: MODAL_SIZES) => ({
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: size === "full" ? "100%" : size === "auto" ? "auto" : size === "large" ? 900 : size === "small" ? 400 : 600,
    maxWidth: "95%",
    bgcolor: 'background.paper',
    boxShadow: 20,
    outline: "none",
    borderRadius: 2,
});

export const modalHeadStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    p: 3
}

export const modalBodyStyle = {
    px: 3
}

export const modalFooterStyle = {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 3,
    p: 3
}