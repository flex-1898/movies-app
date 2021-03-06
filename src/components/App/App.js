import { Switch, Route, Redirect } from 'react-router-dom';

import { LayoutContainer } from '../../containers/LayoutContainer/LayoutContainer';
import { HomePage } from '../../pages/HomePage/HomePage';
import { MovieDetailsPage } from '../../pages/MovieDetailsPage/MovieDetailsPage';
import { AuthPage } from '../../pages/AuthPage/AuthPage';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useAutoLogin } from '../../hooks/useAutoLogin';
import './App.scss';

export const App = () => {
    useDocumentTitle();
    useAutoLogin();

    return (
        <div className="app">
            <LayoutContainer>
                {({ movies }) => (
                    <Switch>
                        <Route path="/profile">
                            <h3>Profile</h3>
                        </Route>

                        <Route path="/movie/:movieId">
                            <MovieDetailsPage movies={movies} />
                        </Route>

                        <Route path="/auth">
                            <AuthPage />
                        </Route>

                        <Route path="/logout">
                            <h3>Logout</h3>
                        </Route>

                        <Route path="/" exact>
                            <HomePage movies={movies} />
                        </Route>

                        <Redirect to="/" />
                    </Switch>
                )}
            </LayoutContainer>
        </div>
    );
};
