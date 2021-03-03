import { authenticateUser } from './auth';
import * as types from '../actionTypes';

it('should authenticate user', () => {
    expect(authenticateUser('STUB_ID_TOKEN', 'STUB_LOCAL_ID')).toEqual({
        type: types.AUTHENTICATE_USER,
        payload: {
            idToken: 'STUB_ID_TOKEN',
            localId: 'STUB_LOCAL_ID'
        }
    });
});

it('should store idToken and localId to localStorage', () => {
    localStorage.clear();

    authenticateUser('STUB_ID_TOKEN', 'STUB_LOCAL_ID');

    const idToken = localStorage.getItem('__tkn');
    const localId = localStorage.getItem('__lid');

    expect(idToken).toBe('STUB_ID_TOKEN');
    expect(localId).toBe('STUB_LOCAL_ID');
});
