import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import "./index.css";
import MUIProvider from './utils/providers/MUIProvider.tsx'
import ConfirmProvider from './utils/providers/ConfirmProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MUIProvider>
        <ConfirmProvider>
          <App />
        </ConfirmProvider>
      </MUIProvider>
    </Provider>
  </React.StrictMode>,
)
