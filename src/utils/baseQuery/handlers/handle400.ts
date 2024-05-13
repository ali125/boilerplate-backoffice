import { Error400, ErrorHandler } from "@/@types/error.type";

const handle400: ErrorHandler<Error400> = (_api, _code, data) => {
  return data?.errors;
};

export default handle400;
