// index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from "react-dom/client"
import App from './App';

const root = document.getElementById('root') || document.createElement('div');
document.body.appendChild(root);

// Use createRoot from react-dom/client
const rootElement = createRoot(root);
rootElement.render(<App />);
