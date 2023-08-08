import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"
import App from './App.jsx'
import store from "../src/redux/store.jsx"
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css"




const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Auth0Provider
      domain='dev-jzsyp78gzn6fdoo4.us.auth0.com'
      clientId='YWoSSAS6qZS9Wf65XTiwUgF9V4EnJP4h'
      authorizationParams={{
        redirect_uri: window.location.origin
      }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </Provider>
)
