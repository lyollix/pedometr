import React from 'react';
import PropTypes from 'prop-types';

//import { renderHumanDateTime } from '../../../utils';

const fields = [
    { name: 'id', label: 'ID'},
    { name: 'date', label: 'Дата' },
    { name: 'distance', label: 'Дистанция' },
    {
        name: 'route', label: 'Маршрут',
        valueFunc: item => (item.route.map((x,i)=>(<div key={i}>{x.join(', ')}</div>)))
    },
    { name: 'comment', label: 'Комментарий' },
];

function WalkInfo({ item }) {
    return (
        <table className="table table-hover table-bordered table-striped">
            <tbody>
            {fields.map(({ label, name, valueFunc }) => (
                <tr key={name}>
                    <td>{label}</td>
                    <td>{valueFunc ? valueFunc(item) : item[name]}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

WalkInfo.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number,
        date: PropTypes.string,
        distance: PropTypes.number
    }).isRequired
};

export default WalkInfo;
