import { useState, useEffect, useContext } from 'react';

import { Card } from './components/Card/Card';
import { Message } from './components/Message/Message';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { CardContainer } from './containers/CardContainer/CardContainer';
import { AppContext } from './contexts/AppContext';
import './App.scss';

const USERS = [
    {
        id: 1,
        fullName: 'John Doe',
        age: 23,
        money: 100
    }
    // {
    //     id: 2,
    //     fullName: 'Mike Smith',
    //     age: 45,
    //     money: '200'
    // },
    // {
    //     id: 3,
    //     fullName: 'Bob Brown',
    //     age: 56,
    //     money: 300
    // }
];

// Not recommended approach
// const INITIAL_STATE = {
//     users: USERS,
//     isVisible: true
// };

// const Money = () => {
//     // ???

//     return (
//         <AppContext.Consumer>
//             {({ money: { value, currency } }) => (
//                 <div className="money">
//                     <span>{value}</span>
//                     <strong>{currency}</strong>
//                 </div>
//             )}
//         </AppContext.Consumer>
//     );
// };

const Money = () => {
    const {
        money: { value, currency },
        setMoney
    } = useContext(AppContext);

    const handleUpdateMoney = () => setMoney({ value: 2500, currency: 'EUR' });

    return (
        <div className="money">
            <span>{value}</span>
            <strong>{currency}</strong>

            <button type="button" onClick={handleUpdateMoney}>
                Set money to 2500 EUR
            </button>
        </div>
    );
};

const UserInfo = ({ moneyAs: moneyComponent }) => <div className="user-info">{moneyComponent}</div>;

const Dashboard = ({ userInfoAs: userInfoComponent }) => (
    <div className="dashboard">{userInfoComponent}</div>
);

export const App = () => {
    // Not recommended approach
    // const [state, setState] = useState(INITIAL_STATE);

    const [users, setUsers] = useState(USERS);
    const [isVisible, setIsVisible] = useState(true);
    const [isShownHiddenMessage, setIsShownHiddenMessage] = useState(false);
    const [money, setMoney] = useState({ value: 0, currency: 'USD' });

    // const countRef = useRef(0);
    // const buttonRef = useRef();

    useEffect(() => {
        console.log('%cApplication is loaded!', 'color: blue; font-weight: bold;');
    }, []);

    // useEffect(() => {
    //     if (!isShownHiddenMessage) return;

    //     buttonRef.current.click();
    // }, [isShownHiddenMessage]);

    // useEffect(() => {
    //     console.log('[users]', users);
    // }, [users]);

    // Not recommended approach
    // const { users, isVisible } = state;

    // Not recommended approach
    // const handleRemoveCard = userId => {
    //     setState(prevState => ({
    //         ...prevState,
    //         users: prevState.users.filter(u => u.id !== userId)
    //     }));
    // };

    const handleRemoveCard = userId => {
        setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
    };

    const handleToggleUsersVisibility = () => {
        setIsVisible(prevIsVisible => !prevIsVisible);
    };

    const handleShowHiddenMessage = () => {
        setIsShownHiddenMessage(true);
    };

    const payload = {
        money,
        setMoney
    };

    return (
        <ErrorBoundary>
            <AppContext.Provider value={payload}>
                <div className="app">
                    <div>
                        <button type="button" onClick={handleToggleUsersVisibility}>
                            {isVisible ? 'Hide users' : 'Show users'}
                        </button>

                        <button type="button" onClick={handleShowHiddenMessage}>
                            Show alert message
                        </button>
                    </div>

                    {isShownHiddenMessage && <Message>This is a hidden message!</Message>}

                    <Dashboard userInfoAs={<UserInfo moneyAs={<Money />} />} />

                    <ul className="app__list">
                        {isVisible ? (
                            users.length ? (
                                users.map(({ id, ...other }) => (
                                    <li key={id} className="app__list-item">
                                        {/* <CardContainer
                                            {...other}
                                            onRemove={() => handleRemoveCard(id)}
                                        /> */}

                                        <CardContainer
                                            {...other}
                                            onRemove={() => handleRemoveCard(id)}
                                        >
                                            {props => <Card {...props} />}
                                        </CardContainer>
                                    </li>
                                ))
                            ) : (
                                <Message>There are no users!</Message>
                            )
                        ) : (
                            <Message>Users are hidden!</Message>
                        )}
                    </ul>
                </div>
            </AppContext.Provider>
        </ErrorBoundary>
    );
};
