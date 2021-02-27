import PT from 'prop-types';
import cn from 'classnames';

import './Input.scss';

const DEFAULT_TYPE = 'text';
const DEFAULT_AUTOCOMPLETE = 'off';

export const Input = ({
    type = DEFAULT_TYPE,
    className,
    autoComplete = DEFAULT_AUTOCOMPLETE,
    ...other
}) => (
    <input {...other} type={type} className={cn('input', className)} autoComplete={autoComplete} />
);

Input.propTypes = {
    /**
     * Type of input
     */
    type: PT.oneOf(['text', 'email', 'password', 'number']),
    /**
     * Additional input's className
     */
    className: PT.string,
    /**
     * Input's autocomplete ability
     */
    autoComplete: PT.oneOf(['on', 'off'])
};
