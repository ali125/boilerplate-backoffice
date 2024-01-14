import { showMessage } from "@/utils/helpers/showMessage";
import { Handler } from "../handleErrorResponse";

const defaultHandler: Handler = (_api, _code, message = "", silent) => {
    if (!silent) {
        showMessage(message, "error");
    }
}

export default defaultHandler;
