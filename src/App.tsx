import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks"
import i18n from "@/config/translation/i18n";
import Router from "./router";


function App() {
  const { language } = useAppSelector(state => state.settings);
  // const { accessToken } = useAppSelector(state => state.auth);

  // const { isLoading } = useGetPostsQuery();

  // const orderedPosts = useSelector(selectAllPosts);

  // const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(setLanguage("fa"))
  //     dispatch(setAuthToken({ accessToken: "Hey you" }));
  //   }, 2000);
  // }, []);

  return (
    <>
      <Router />
      {/* <h1>Hello World</h1>
      <h3>accessToken: {accessToken}</h3>
      <h4 className="font-bold">{t("hello")}</h4>
      <h5>isLoading: {String(isLoading)}</h5>
      <ul>
        {orderedPosts.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul> */}
    </>
  )
}

export default App
