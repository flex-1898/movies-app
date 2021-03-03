import { BrowserRouter } from 'react-router-dom';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'redux';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

import { App } from './components/App/App';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { rootReducer } from './store/root';
import './styles/index.scss';

SwiperCore.use([Navigation, Pagination]);

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const Root = () => (
    <ReduxProvider store={store}>
        <BrowserRouter>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </BrowserRouter>
    </ReduxProvider>
);
