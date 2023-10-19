import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import MainPage from "./pages/MainPage/MainPage.jsx"
import { Provider } from "react-redux"
import { store } from "./redux/store"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <MainPage />
  </Provider>,
)
