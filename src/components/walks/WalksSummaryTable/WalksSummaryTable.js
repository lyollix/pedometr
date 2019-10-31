import React, { Component } from 'react';
import PropTypes from 'prop-types';
import size from 'lodash/size';
import sortBy from 'lodash/sortBy';

import { LinkTo } from '@/helpers';
import { renderHumanDate, renderHumanTime, renderHumanDistance } from "@/utils";
import SortIndicator from '@/assets/images/sort-indicator.svg';

class WalksSummaryTable extends Component {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            date: PropTypes.string.isRequired,
            distance: PropTypes.number.isRequired
        })).isRequired
    };

    state = {
        items: this.props.items,
        sort: null,
        sortOrders: {
            'date': false,
            'distance': false
        }
    };

    onSort(field) {
        const {sort, sortOrders} = this.state;

        if (sort===field) {
            const t = sortOrders;
            t[field] = !t[field];
            this.setState({sortOrders: t})
        }
        const sortedItems = sortBy(this.state.items, x=>x[field]);
        this.setState({items: sortOrders[field] ? sortedItems.reverse() : sortedItems});
        this.setState({sort: field})
    }

    render() {
        const {items, sort, sortOrders} = this.state;

        if (size(items) === 0) {
            return <h1>No Records</h1>;
        }

        return (
            <div className="table">
                <div className="thead">
                    <div className="tr">
                        {[['date','Дата'],['distance','Дистанция']].map(x=>(
                            <div key={x[0]} className="th" onClick={()=>this.onSort(x[0])}>
                                {x[1]}
                                <span
                                    className={`sort-indicator ${sort===x[0]? 'active' : ''} ${sortOrders[x[0]]? 'desc': ''}`}>
                                <SortIndicator width={10} height={10}/>
                            </span>
                            </div>
                        ))}

                    </div>
                </div>
                <div className="tbody">
                    {items.map(item => (
                        <LinkTo className="tr" key={item.id} href={`walks/${item.id}/edit`}>
                            <div className="td walk-date"
                                 dangerouslySetInnerHTML={{__html: `<div>${renderHumanDate(item.date)}</div>`}}
                            />
                            <div className="td">{renderHumanDistance(item.distance)}</div>
                        </LinkTo>
                    ))}
                </div>
            </div>
        )
    }
}

export default WalksSummaryTable;
