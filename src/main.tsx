import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/index.css';

import App from './App.tsx';

const rootEl = document.getElementById('root')!;

if (!rootEl.innerHTML) {
    const root = createRoot(rootEl);
    root.render(
        <StrictMode>
            <App />
        </StrictMode>
    );
}
