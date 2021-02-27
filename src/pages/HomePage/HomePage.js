import PT from 'prop-types';
import { Link } from 'react-router-dom';

import noImage from '../../resources/images/no-image.png';
import './HomePage.scss';

const { REACT_APP_STORAGE_URL: storageUrl } = process.env;

export const HomePage = ({ movies }) => (
    <div className="home-page">
        {movies.length ? (
            <ul className="home-page__list">
                {movies.map(({ id, original_title, poster_path }) => {
                    const posterUrl = poster_path ? `${storageUrl}/w500${poster_path}` : noImage;

                    return (
                        <li
                            key={id}
                            className="home-page__list-item"
                            style={{ backgroundImage: `url(${posterUrl})` }}
                        >
                            <Link
                                to={`/movie/${id}`}
                                className="home-page__link"
                                title={original_title}
                            >
                                <h2 className="home-page__title">{original_title}</h2>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        ) : (
            <p>There are no movies yet</p>
        )}
    </div>
);

HomePage.propTypes = {
    /**
     * List of movies fetched from the Movies API
     */
    movies: PT.arrayOf(
        PT.shape({
            id: PT.number.isRequired,
            poster_path: PT.string,
            original_title: PT.string.isRequired
        })
    ).isRequired
};
