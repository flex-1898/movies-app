import PT from 'prop-types';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import { MovieDetailsContainer } from '../../containers/MovieDetailsContainer/MovieDetailsContainer';
import { Button } from '../../components/Button/Button';
import { Poster } from '../../components/Poster/Poster';
import { Loader } from '../../components/Loader/Loader';
import noImage from '../../resources/images/no-image.png';
import './MovieDetailsPage.scss';

const { REACT_APP_STORAGE_URL: storageUrl } = process.env;

export const MovieDetailsPage = () => (
    <MovieDetailsContainer>
        {({ movieDetails, similarMovies, isFetchingMovieDetails, isFetchingSimilarMovies }) => {
            const {
                original_title,
                release_date,
                poster_path,
                backdrop_path,
                overview
            } = movieDetails;

            const frontImage = poster_path ? `${storageUrl}/w500${poster_path}` : noImage;
            const backImage = backdrop_path && `${storageUrl}/w500${backdrop_path}`;

            return (
                <div className="movie-details-page">
                    {isFetchingMovieDetails ? (
                        <Loader />
                    ) : (
                        <div className="movie-details-page__top">
                            <div className="movie-details-page__image-wrapper">
                                <Poster
                                    frontImage={frontImage}
                                    backImage={backImage}
                                    alt={original_title}
                                />
                            </div>

                            <div className="movie-details-page__info">
                                <div className="movie-details-page__block">
                                    <span className="movie-details-page__label">
                                        Original title
                                    </span>

                                    <h2 className="movie-details-page__title">{original_title}</h2>
                                </div>

                                <div className="movie-details-page__block">
                                    <span className="movie-details-page__label">Release date</span>
                                    <span className="movie-details-page__date">{release_date}</span>
                                </div>

                                <div className="movie-details-page__block">
                                    <span className="movie-details-page__label">Overview</span>
                                    <p className="movie-details-page__text">{overview}</p>
                                </div>

                                <Button variant="primary" title="Add to Favorite">
                                    Add to Favorite
                                </Button>
                            </div>
                        </div>
                    )}

                    {isFetchingSimilarMovies ? (
                        <Loader />
                    ) : (
                        <div className="movie-details-page__bottom">
                            <Swiper
                                spaceBetween={15}
                                slidesPerView={6}
                                navigation
                                pagination={{ clickable: true }}
                            >
                                {similarMovies.map(({ id, original_title, poster_path }) => (
                                    <SwiperSlide key={id}>
                                        <Link to={`/movie/${id}`} title={original_title}>
                                            <img
                                                src={`${storageUrl}/w500${poster_path}`}
                                                alt={original_title}
                                                className="movie-details-page__slide-image"
                                            />
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}
                </div>
            );
        }}
    </MovieDetailsContainer>
);

MovieDetailsPage.propTypes = {
    /**
     * List of fetched movies from the API
     */
    movies: PT.arrayOf(
        PT.shape({
            id: PT.number.isRequired,
            original_title: PT.string.isRequired,
            poster_path: PT.string,
            release_date: PT.string.isRequired,
            backdrop_path: PT.string,
            overview: PT.string.isRequired
        })
    ).isRequired
};
