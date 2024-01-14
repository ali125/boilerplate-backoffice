import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks"
import { setAuthToken } from "./redux/authSlice";


function App() {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setAuthToken({ accessToken: "Hey you" }));
    }, 2000);
  }, []);

  return (
    <>
      <h1>Hello World</h1>
      <h3>accessToken: {accessToken}</h3>
    </>
  )
}

export default App
