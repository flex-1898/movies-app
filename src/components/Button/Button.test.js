import { render, fireEvent } from '@testing-library/react';

import { Button } from './Button';

describe('<Button />', () => {
    it('should render a button', () => {
        const { getByText } = render(
            <Button variant="primary" title="Login">
                Login
            </Button>
        );

        getByText('Login');
    });

    it('should call onClick function', () => {
        const mockOnClick = jest.fn();

        const { getByText } = render(
            <Button variant="primary" title="Login" onClick={mockOnClick}>
                Login
            </Button>
        );

        const button = getByText('Login');

        fireEvent.click(button);

        expect(mockOnClick).toHaveBeenCalled();
    });

    it('should match snapshot', () => {
        const { getByText } = render(
            <Button variant="primary" title="Login">
                Login
            </Button>
        );

        const button = getByText('Login');

        expect(button).toMatchSnapshot();
    });
});
