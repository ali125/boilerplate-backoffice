import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setAuthToken } from "@/redux/authSlice";
import i18n from "@/config/translation/i18n";
import { useTranslation } from "react-i18next";
import { setLanguage } from "./redux/settingSlice";


function App() {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector(state => state.settings);
  const { accessToken } = useAppSelector(state => state.auth);

  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setLanguage("fa"))
      dispatch(setAuthToken({ accessToken: "Hey you" }));
    }, 2000);
  }, []);

  return (
    <>
      <h1>Hello World</h1>
      <h3>accessToken: {accessToken}</h3>
      <h4 className="font-bold">{t("hello")}</h4>
    </>
  )
}

export default App
