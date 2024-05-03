import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import "./index.css";
import extendedApiSlice from './redux/apiSlice/postsSlice.ts'
import MUIProvider from './utils/providers/MUIProvider.tsx'

store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MUIProvider>
        <App />
      </MUIProvider>
    </Provider>
  </React.StrictMode>,
)
