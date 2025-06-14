import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider, createRouter } from '@tanstack/react-router';

import './styles/index.css';

import { routeTree } from './routeTree.gen';
const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const root = createRoot(document.getElementById('root')!);
root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
