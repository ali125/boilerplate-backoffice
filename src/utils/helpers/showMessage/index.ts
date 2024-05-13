import { Id, ToastOptions, toast } from "react-toastify";

type Types = "success" | "error" | "warning" | "info";

export const showMessage = (
  description: string,
  type: Types,
  options?: ToastOptions<object>
): Id => {
  switch (type) {
    case "success":
      return toast.success(description, options);
    case "error":
      return toast.error(description, options);
    case "warning":
      return toast.warning(description, options);
    case "info":
      return toast.info(description, options);
    default:
      return toast.info(description, options);
  }
};

export const dismissMessage = (id?: Id) => {
  toast.dismiss(id);
};
