import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppProvider } from './context/AppProvider';
import { initAnalytics } from './utils/analytics';
import { captureUtm } from './utils/links';
import { guardDomForTranslation } from './utils/siteTranslate';

guardDomForTranslation();
captureUtm();
initAnalytics();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
