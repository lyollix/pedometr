import React from 'react';
import PropTypes from 'prop-types';
import size from 'lodash/size';

import { LinkTo, Button } from '@/helpers';
import { renderHumanDate, renderHumanTime, renderHumanDistance } from "@/utils";
import SortIndicator from '@/assets/images/sort-indicator.svg';
import IconShow from '@/assets/images/eye.svg';
import IconEdit from '@/assets/images/pencil-alt.svg';
import IconTrash from '@/assets/images/trash.svg';

function WalksTable({ items, onDelete }) {
    if (size(items) === 0) {
        return <h1>No Records</h1>;
    }

    return (
        <table className="table">
            <thead>
            <tr>
                {['ID','Дата','Время','Дистанция','Комментарий'].map(x=>(
                    <th key={x}>
                        {x}
                        <span className="sort-indicator">
                        <SortIndicator width={10} height={10}/>
                    </span>
                    </th>
                ))}
                <th />
            </tr>
            </thead>
            <tbody>
            {items.map(item => (
                <tr key={item.id}>
                    <td>
                        <LinkTo href={`walks/${item.id}/show`}>{item.id}</LinkTo>
                    </td>
                    <td className="walk-date" dangerouslySetInnerHTML={{__html: renderHumanDate(item.date)}}/>
                    <td>{renderHumanTime(item.date)}</td>
                    <td>{renderHumanDistance(item.distance)}</td>
                    <td>{item.comment}</td>
                    <td className="table-actions">
                        <LinkTo button addClass="p-0 ml-1" href={`walks/${item.id}/show`}>
                            <IconShow width={17} height={17}/>
                        </LinkTo>
                        <LinkTo button addClass="p-0 ml-1" href={`walks/${item.id}/edit`}>
                            <IconEdit width={17} height={17}/>
                        </LinkTo>
                        <Button addClass="p-0 ml-1" style={{verticalAlign:'bottom'}} onClick={()=>onDelete(item)}>
                            <IconTrash width={17} height={17}/>
                        </Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

WalksTable.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        distance: PropTypes.number.isRequired
    })).isRequired,
    onDelete: PropTypes.func.isRequired
};

export default WalksTable;
