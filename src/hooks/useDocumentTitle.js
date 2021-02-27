import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PAGES = [
    { path: '/', title: 'Home' },
    { path: '/movie', title: 'Movie Details' }
];

export const useDocumentTitle = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const page = PAGES.find(({ path }) =>
            path === '/' ? path === pathname : pathname.includes(path)
        );

        document.title = page ? 'Movies App | ' + page.title : 'Movies App';
    }, [pathname]);
};
