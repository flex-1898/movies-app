import { LayoutContainer } from '../../containers/LayoutContainer/LayoutContainer';

import './App.scss';

export const App = () => (
    <div className="app">
        <LayoutContainer>
            {({ movies }) => (
                <div>{movies.length ? <div>{movies}</div> : <p>There are no movies yet</p>}</div>
            )}
        </LayoutContainer>
    </div>
);
