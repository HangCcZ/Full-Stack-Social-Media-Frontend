import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { Provider } from "react-redux"
import store from "./store"
import { BrowserRouter as Router } from "react-router-dom"
import Footer from "./components/Footer"
ReactDOM.render(
  [
    <Provider store={store} key='1'>
      <Router>
        <App />
      </Router>
    </Provider>,
    <Footer key='2' />,
  ],
  document.getElementById("root")
)
