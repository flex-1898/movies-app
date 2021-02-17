import { useContext, useEffect, useState } from 'react';

// import { Card } from '../../components/Card/Card';
import { AppContext } from '../../contexts/AppContext';

const TAX = 250;

// export const CardContainer = ({ as: Component = Card, money, ...other }) => {
export const CardContainer = ({ children, money, ...other }) => {
    const [total, setTotal] = useState(+money + TAX);
    const { setMoney } = useContext(AppContext);

    useEffect(
        () => () =>
            console.log('%cCard is going to be unmounted...', 'color: red; font-weight: bold;'),
        []
    );

    useEffect(() => {
        console.log('%cTotal', 'color: orange; font-weight: bold;', total);

        // Cleanup
        return () => console.log('%cTotal (cleanup)', 'color: purple; font-weight: bold;', total);
    }, [total]);

    const handleChangeTotal = e => {
        setTotal(+e.target.value);
    };

    const handleUpdateMoney = () => setMoney({ value: 1250, currency: 'USD' });

    return children({
        ...other,
        total,
        onChangeTotal: handleChangeTotal,
        onUpdateMoney: handleUpdateMoney
    });

    // return (
    //     <Component
    //         {...other}
    //         total={total}
    //         onChangeTotal={handleChangeTotal}
    //         onUpdateMoney={handleUpdateMoney}
    //     />
    // );
};
