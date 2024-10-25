import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/App';
import './style/style.scss';
import { Provider } from 'react-redux';
import store from './app/store/store';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// is mounted two times with React Strict

// root.render(
//     <Provider store={store}>
//       <App />
//     </Provider>
// );
