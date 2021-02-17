import { App } from './components/App/App';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

import './styles/index.scss';

export const Root = () => (
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
);
