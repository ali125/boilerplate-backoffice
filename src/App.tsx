import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "@/redux/hooks"
import i18n from "@/config/translation/i18n";
import Router from "./router";

function App() {
  const { language } = useAppSelector(state => state.settings);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <>
      <Router />
      <ToastContainer />
    </>
  )
}

export default App;

