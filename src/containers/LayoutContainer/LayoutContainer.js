import { useState } from 'react';
import PT from 'prop-types';

import { Layout } from '../../components/Layout/Layout';

export const LayoutContainer = ({ as: Component = Layout, ...other }) => {
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleChangeSearch = e => {
        setSearch(e.target.value);
    };

    const handleSearchMovies = () => {
        setIsSearching(true);

        // Sending request...
        setTimeout(() => {
            const mockMovies = [1, 2, 3];

            setMovies(mockMovies);
            setIsSearching(false);
        }, 3000);
    };

    return (
        <Component
            {...other}
            search={search}
            movies={movies}
            isSearching={isSearching}
            onChangeSearch={handleChangeSearch}
            onSearchMovies={handleSearchMovies}
        />
    );
};

LayoutContainer.propTypes = {
    /**
     * Component to render
     */
    as: PT.elementType
};
