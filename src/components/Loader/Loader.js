import cn from 'classnames';
import PT from 'prop-types';

import './Loader.scss';

export const Loader = ({ className }) => (
    <div className={cn('loader', className)}>
        <div className="loader__child loader__child--1" />
        <div className="loader__child loader__child--2" />
        <div className="loader__child loader__child--3" />
        <div className="loader__child loader__child--4" />
        <div className="loader__child loader__child--5" />
        <div className="loader__child loader__child--6" />
        <div className="loader__child loader__child--7" />
        <div className="loader__child loader__child--8" />
        <div className="loader__child loader__child--9" />
        <div className="loader__child loader__child--10" />
        <div className="loader__child loader__child--11" />
        <div className="loader__child loader__child--12" />
    </div>
);

Loader.propTypes = {
    /**
     * Additional loader's class name
     */
    className: PT.string
};
