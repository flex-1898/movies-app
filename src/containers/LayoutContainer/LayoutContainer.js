import { useState } from 'react';
import PT from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';

import { Layout } from '../../components/Layout/Layout';
import { useFetch } from '../../hooks/useFetch';

const { REACT_APP_MOVIES_API_KEY: apiKey, REACT_APP_MOVIES_API_URL: baseUrl } = process.env;

export const LayoutContainer = ({ as: Component = Layout, ...other }) => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const { pathname } = useLocation();
    const history = useHistory();

    const url = `${baseUrl}/search/movie?api_key=${apiKey}&query=${search}&page=${page}`;

    const { data, refetch, isFetching } = useFetch(url, {
        enabled: false,
        onSuccess: () => {
            if (pathname === '/') return;

            history.push('/');
        }
    });

    const handleChangeSearch = e => {
        setSearch(e.target.value);
    };

    const handleChangePage = pageNumber => {
        setPage(pageNumber);
    };

    const movies = data?.results || [];

    return (
        <Component
            {...other}
            search={search}
            movies={movies}
            isSearching={isFetching}
            onChangeSearch={handleChangeSearch}
            onSearchMovies={refetch}
            onChangePage={handleChangePage}
        />
    );
};

LayoutContainer.propTypes = {
    /**
     * Component to render
     */
    as: PT.elementType
};
