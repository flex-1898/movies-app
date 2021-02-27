import { BrowserRouter } from 'react-router-dom';

import { App } from './components/App/App';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

import './styles/index.scss';

export const Root = () => (
    <BrowserRouter>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </BrowserRouter>
);
