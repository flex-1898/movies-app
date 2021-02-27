import { useState } from 'react';
import cn from 'classnames';
import PT from 'prop-types';

import './Poster.scss';

export const Poster = ({ className, frontImage, backImage, alt }) => {
    const [isHovered] = useState(false);

    return (
        <div
            className={cn('poster', className)}
            // TODO: Temporary disabled due to back image bug
            // onMouseOver={() => setIsHovered(true)}
            // onMouseOut={() => setIsHovered(false)}
        >
            <img
                src={frontImage}
                alt={alt}
                className={cn('poster__image poster__image--front', {
                    'poster__image--hidden': backImage && isHovered
                })}
            />

            {/* TODO: Temporary disabled due to back image bug */}
            {/* {!!backImage && (
                <img src={backImage} alt={alt} className="poster__image poster__image--back" />
            )} */}
        </div>
    );
};

Poster.propTypes = {
    /**
     * Additional poster's class name
     */
    className: PT.string,
    /**
     * Front image path
     */
    frontImage: PT.string.isRequired,
    /**
     * Back image path
     */
    backImage: PT.string,
    /**
     * Alt attribute for both images
     */
    alt: PT.string
};
