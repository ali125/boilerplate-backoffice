import { showMessage } from "@/utils/helpers/showMessage";
import { ErrorHandler } from "@/@types/error.type";
import getErrorMessage from "../getErrorMessage";

const defaultHandler: ErrorHandler = (_api, code, data, silent) => {
  if (!silent) {
    showMessage(data?.message || getErrorMessage(code) || "", "error");
  }
};

export default defaultHandler;
