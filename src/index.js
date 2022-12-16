import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import toast, { ToastBar, Toaster } from 'react-hot-toast';
import StateProvider from './Context/StateProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StateProvider>
        <BrowserRouter basename='/siveing-web3-dapp'>
            <React.StrictMode>
                <App />
                <Toaster>
                    {(t) => (
                        <ToastBar toast={t}>
                            {({ icon, message }) => (
                                <>
                                    {icon}
                                    {message}
                                    {t.type !== 'loading' && (
                                        <button onClick={() => toast.dismiss(t.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </>
                            )}
                        </ToastBar>
                    )}
                </Toaster>
            </React.StrictMode>
        </BrowserRouter>
    </StateProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
