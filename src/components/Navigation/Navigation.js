import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import './Navigation.scss';

const LINKS = [
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
        url: '/logout',
        icon: 'fas fa-sign-out-alt',
        title: 'Logout'
    }
];

export const Navigation = () => (
    <nav className="navigation">
        <ul className="navigation__list">
            {LINKS.map(({ id, url, exact, icon, title }) => (
                <li key={id} className="navigation__list-item">
                    <NavLink to={url} exact={exact} className="navigation__link" title={title}>
                        <i className={cn('navigation__icon', icon)} />
                        {title}
                    </NavLink>
                </li>
            ))}
        </ul>
    </nav>
);
