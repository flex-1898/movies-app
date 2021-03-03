import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '../Button/Button';
import { logoutUser } from '../../store/actions/auth';
import './Navigation.scss';

const selectIdToken = state => !!state.auth.idToken;

export const Navigation = () => {
    const isAuthenticated = useSelector(selectIdToken);
    const dispatch = useDispatch();

    const handleLogout = () => dispatch(logoutUser());

    const links = [
        {
            id: 1,
            url: '/',
            exact: true,
            icon: 'fas fa-home',
            title: 'Home'
        },
        {
            id: 2,
            url: '/profile',
            icon: 'fas fa-user',
            title: 'Profile'
        },
        {
            id: 3,
            url: isAuthenticated ? null : '/auth',
            icon: 'fas fa-sign-out-alt',
            title: isAuthenticated ? 'Logout' : 'Log in',
            onClick: handleLogout
        }
    ];

    return (
        <nav className="navigation">
            <ul className="navigation__list">
                {links.map(({ id, url, exact, icon, title, onClick }) => (
                    <li key={id} className="navigation__list-item">
                        {url ? (
                            <NavLink
                                to={url}
                                exact={exact}
                                className="navigation__link"
                                title={title}
                            >
                                <i className={cn('navigation__icon', icon)} />
                                {title}
                            </NavLink>
                        ) : (
                            <Button
                                variant="tertiary"
                                className="navigation__link"
                                title={title}
                                onClick={onClick}
                            >
                                <i className={cn('navigation__icon', icon)} />
                                {title}
                            </Button>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};
