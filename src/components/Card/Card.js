import PT from 'prop-types';

import './Card.scss';

export const Card = ({ fullName, age, total, onRemove, onChangeTotal, onUpdateMoney }) => (
    <div className="card">
        <span className="card__info">
            {fullName}, {age}
        </span>

        <div>
            <input
                type="number"
                name="total"
                placeholder="Total"
                min={0}
                value={total}
                onChange={onChangeTotal}
            />
        </div>

        <button type="button" className="card__button" onClick={onRemove}>
            Remove
        </button>

        <button type="button" className="card__button" onClick={onUpdateMoney}>
            Set money to 1250 USD
        </button>
    </div>
);

Card.propTypes = {
    fullName: PT.string.isRequired,
    age: PT.number.isRequired,
    onRemove: PT.func.isRequired
};
