import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { FormControl } from '../../components/FormControl/FormControl';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { useMutation } from '../../hooks/useMutation';
import { authenticateUser } from '../../store/actions/auth';
import './AuthPage.scss';

const { REACT_APP_FIREBASE_API_KEY: apiKey, REACT_APP_FIREBASE_AUTH_URL: baseUrl } = process.env;

const LOG_IN_MODE = 'log-in';
const REGISTER_MODE = 'register';
const EMAIL_PATTERN = /^[a-zA-Z-._0-9]+@[a-z]+\.[a-z]{2,3}$/;

const LOG_IN_FIELDS = [
    {
        as: Input,
        id: 'email',
        type: 'email',
        name: 'email',
        placeholder: 'E-mail',
        label: 'E-mail',
        rules: {
            required: 'This is a required field',
            pattern: {
                value: EMAIL_PATTERN,
                message: 'Provided value should be an email address'
            }
        }
    },
    {
        as: Input,
        id: 'password',
        type: 'password',
        name: 'password',
        placeholder: 'Password',
        label: 'Password',
        rules: {
            required: 'This is a required field'
        }
    }
];

const selectIdToken = state => !!state.auth.idToken;

export const AuthPage = () => {
    const [mode, setMode] = useState(LOG_IN_MODE);

    const { handleSubmit, control, errors, formState, getValues, clearErrors, reset } = useForm({
        defaultValues: {
            firstName: 'John',
            lastName: 'Doe',
            age: 23,
            email: 'john.doe@gmail.com',
            password: '123456',
            confirmPassword: '123456'
        }
    });
    const isAuthenticated = useSelector(selectIdToken);
    const dispatch = useDispatch();

    const isLogInMode = mode === LOG_IN_MODE;
    const authUrl = isLogInMode
        ? `/accounts:signInWithPassword?key=${apiKey}`
        : `/accounts:signUp?key=${apiKey}`;

    const { mutate } = useMutation({
        url: baseUrl + authUrl,
        headers: {
            'Content-Type': 'application/json'
        },
        onSuccess: response => {
            const { idToken, localId } = response;

            // TODO: Handle errors
            if (!idToken && !localId) return;

            dispatch(authenticateUser(idToken, localId));
        }
    });

    useEffect(() => {
        reset();
        clearErrors();
    }, [mode, reset, clearErrors]);

    if (isAuthenticated) return <Redirect to="/" />;

    const handleSwitchMode = () => {
        setMode(prevMode => (prevMode === LOG_IN_MODE ? REGISTER_MODE : LOG_IN_MODE));
    };

    const onSubmit = values => mutate(JSON.stringify({ ...values, returnSecureToken: true }));
    const onError = errors => console.log('[errors]', errors);

    const REGISTER_FIELDS = [
        {
            as: Input,
            id: 'first-name',
            type: 'text',
            name: 'firstName',
            placeholder: 'First name',
            label: 'First name',
            rules: {
                required: 'This is a required field'
            }
        },
        {
            as: Input,
            id: 'last-name',
            type: 'text',
            name: 'lastName',
            placeholder: 'Last name',
            label: 'Last name',
            rules: {
                required: 'This is a required field'
            }
        },
        {
            as: Input,
            id: 'age',
            type: 'number',
            name: 'age',
            placeholder: 'Age',
            label: 'Age',
            rules: {
                valueAsNumber: true
            }
        },
        {
            as: Input,
            id: 'email',
            type: 'email',
            name: 'email',
            placeholder: 'E-mail',
            label: 'E-mail',
            rules: {
                required: 'This is a required field'
            }
        },
        {
            as: Input,
            id: 'password',
            type: 'password',
            name: 'password',
            placeholder: 'Password',
            label: 'Password',
            rules: {
                required: 'This is a required field',
                minLength: {
                    value: 6,
                    message: 'Password should have minimum length of 6'
                }
            }
        },
        {
            as: Input,
            id: 'confirm-password',
            type: 'password',
            name: 'confirmPassword',
            placeholder: 'Confirm password',
            label: 'Confirm password',
            rules: {
                required: 'This is a required field',
                validate: confirmPasswordValue => {
                    const passwordValue = getValues('password');

                    if (confirmPasswordValue === passwordValue) return null;

                    return 'Password and confirm password should match';
                }
            }
        }
    ];

    const fields = isLogInMode ? LOG_IN_FIELDS : REGISTER_FIELDS;

    const { isSubmitting } = formState;

    return (
        <div className="auth-page">
            <div className="auth-page__form-wrapper">
                <form
                    autoComplete="off"
                    noValidate
                    className="auth-page__form"
                    onSubmit={handleSubmit(onSubmit, onError)}
                >
                    <fieldset className="auth-page__fieldset">
                        <legend className="auth-page__legend">
                            {isLogInMode ? 'Log in to your account' : 'Register'}
                        </legend>

                        {fields.map(({ id, ...other }) => (
                            <FormControl
                                key={id}
                                id={id}
                                className="auth-page__form-control"
                                control={control}
                                errors={errors}
                                {...other}
                            />
                        ))}
                    </fieldset>

                    <Button
                        type="submit"
                        className="auth-page__submit-button"
                        disabled={isSubmitting}
                    >
                        {isLogInMode ? 'Log in' : 'Register'}
                    </Button>
                </form>

                <div className="auth-page__divider" />

                <div className="auth-page__note-wrapper">
                    <span>{isLogInMode ? "Don't have account?" : 'Already have an account?'}</span>{' '}
                    <Button
                        variant="tertiary"
                        className="auth-page__switch-button"
                        onClick={handleSwitchMode}
                    >
                        {isLogInMode ? 'Create account' : 'Log in to your account'}
                    </Button>
                </div>
            </div>
        </div>
    );
};
