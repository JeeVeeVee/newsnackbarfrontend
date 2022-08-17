import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {SnackbarProvider} from "./context/SnackbarProvider";
import {SnackProvider} from "./context/SnackProvider";
import {Auth0Provider} from "@auth0/auth0-react";
import {getConfig} from "./config";
import {AuthProvider} from "./context/AuthProvider";
import {OrderProvider} from "./context/OrderProvider";
import {OrderRowProvider} from "./context/OrderRowProvider";

const config = getConfig();

const providerConfig = {
    domain: config.domain,
    clientId: config.clientId,
    ...(config.audience ? { audience: config.audience } : null),
    redirectUri: window.location.origin,
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Auth0Provider
            {...providerConfig}
        >
            <AuthProvider>
                <SnackbarProvider>
                    <SnackProvider>
                        <OrderProvider>
                            <OrderRowProvider>
                                <App />
                            </OrderRowProvider>
                        </OrderProvider>
                    </SnackProvider>
                </SnackbarProvider>
            </AuthProvider>
        </Auth0Provider>
    </React.StrictMode>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
