import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/App';
import './style/style.scss';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// is mounted two times with React Strict

// root.render(
//     <App />
// );
