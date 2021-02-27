import PT from 'prop-types';

import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Navigation } from '../Navigation/Navigation';
import './Layout.scss';

export const Layout = ({
    search,
    movies,
    isSearching,
    onChangeSearch,
    onSearchMovies,
    children
}) => (
    <div className="layout">
        <h1 className="layout__title">movies-app</h1>

        <header className="layout__header">
            <div className="width-limiter layout__header-wrapper">
                <div className="layout__search-wrapper">
                    <Input
                        className="layout__search-input"
                        name="search"
                        placeholder="Search"
                        disabled={isSearching}
                        value={search}
                        onChange={onChangeSearch}
                    />

                    <Button title="Search" disabled={isSearching} onClick={onSearchMovies}>
                        {isSearching ? 'Searching' : 'Search'}
                    </Button>
                </div>

                <Navigation />
            </div>
        </header>

        <main className="layout__main">
            <div className="width-limiter layout__main-wrapper">{children({ movies })}</div>
        </main>

        <footer className="layout__footer">
            <strong className="layout__copyright">
                All Rights Reserved, {new Date().getFullYear()}
            </strong>
        </footer>
    </div>
);

Layout.propTypes = {
    /**
     * Value for the search input
     */
    search: PT.string.isRequired,
    /**
     * List of fetched movies
     */
    movies: PT.array.isRequired,
    /**
     * Indicates whether movies are searching
     */
    isSearching: PT.bool.isRequired,
    /**
     * Render function for component presentation
     */
    children: PT.func.isRequired,
    /**
     * Callback for changing value of the search input
     */
    onChangeSearch: PT.func.isRequired,
    /**
     * Callback for seaching movies
     */
    onSearchMovies: PT.func.isRequired
};
