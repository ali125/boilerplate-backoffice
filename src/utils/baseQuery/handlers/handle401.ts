import { Handler } from "../handleErrorResponse";
import { logOut } from "@/redux/authSlice";

const handle401: Handler = (api) => {
  api.dispatch(logOut());
};

export default handle401;
