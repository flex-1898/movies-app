import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { authenticateUser } from '../store/actions/auth';

const ID_TOKEN_ALIAS = '__tkn';
const LOCAL_ID_ALIAS = '__lid';

export const useAutoLogin = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const idToken = localStorage.getItem(ID_TOKEN_ALIAS);
        const localId = localStorage.getItem(LOCAL_ID_ALIAS);

        if (idToken && localId) {
            return dispatch(authenticateUser(idToken, localId));
        }

        localStorage.removeItem(ID_TOKEN_ALIAS);
        localStorage.removeItem(LOCAL_ID_ALIAS);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
