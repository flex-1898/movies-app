import { Component } from 'react';

export class ErrorBoundary extends Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {};
    // }

    state = {
        error: null
    };

    static getDerivedStateFromError(error) {
        return { error };
    }

    componentDidCatch(error, info) {
        console.log('[error]', error);
        console.log('[info]', info);
    }

    render() {
        const { children } = this.props;
        const { error } = this.state;

        if (error) {
            return (
                <div>
                    <h1>Hello World!</h1>
                    {/* <strong>{error.name}</strong>
                    <p>{error.message}</p>
                    <p>{error.stack}</p> */}
                </div>
            );
        }

        return children;
    }
}
