import { Redirect, useParams } from 'react-router-dom';
import PT from 'prop-types';

import { useFetch } from '../../hooks/useFetch';

const { REACT_APP_MOVIES_API_KEY: apiKey, REACT_APP_MOVIES_API_URL: baseUrl } = process.env;

export const MovieDetailsContainer = ({ children }) => {
    const { movieId } = useParams();

    const { data: movieDetails, isFetching: isFetchingMovieDetails } = useFetch(
        `${baseUrl}/movie/${movieId}?api_key=${apiKey}`
    );

    const { data: similarMovies, isFetching: isFetchingSimilarMovies } = useFetch(
        `${baseUrl}/movie/${movieId}/similar?api_key=${apiKey}`
    );

    if (!isFinite(movieId)) return <Redirect to="/" />;

    return children({
        movieDetails: movieDetails || {},
        similarMovies: similarMovies?.results || [],
        isFetchingMovieDetails,
        isFetchingSimilarMovies
    });
};

MovieDetailsContainer.propTypes = {
    /**
     * Render prop
     */
    children: PT.func.isRequired
};
