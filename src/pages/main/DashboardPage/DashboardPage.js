import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import groupBy from 'lodash/groupBy'
import mapValues from 'lodash/mapValues'
import keys from 'lodash/keys'
import values from 'lodash/values'
import sortBy from 'lodash/sortBy'
import flatten from 'lodash/flatten'
import moment from 'moment'

import { fetchWalks as fetchWalksAction } from '@/actions/WalkActions';
import { WalksSummaryTable, WalksChart, YandexMap } from '@/components';
import { Loading, LinkTo, Modal, Button } from '@/helpers';
import { renderHumanDistance } from "@/utils";

class DashboardPage extends Component {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired
        })).isRequired,
        itemsLoading: PropTypes.bool.isRequired,
        itemsFetched: PropTypes.bool.isRequired,
        itemsErrorMessage: PropTypes.string,
        fetchWalks: PropTypes.func.isRequired
    };

    static defaultProps = {
        itemsErrorMessage: null
    };

    state = {
        distances: [],
        chartColumns: [],
        route: null
    };

    componentDidMount() {
        this.fetchData().then(({items})=> {
            const p = mapValues(
                groupBy(items, x => moment(x.date).format('DD.MM.YYYY')),
                x => x.reduce((a, b)=> a + b.distance, 0)
            );
            this.setState({distances: values(p)});
            this.setState({chartColumns: [
                ['x', ...keys(p)],
                ['distance', ...values(p)]
            ]});
        })
    }

    fetchData(page = 1) {
        return this.props.fetchWalks({
            page, filters: this.state.filters
        });
    }

    onShowRoutes(date) {
        const route = flatten(sortBy(this.props.items
            .filter(x=>moment(x.date).format('DD.MM.YYYY')===date), x=>x.date)
            .map(x=>x.route));
        this.setState({route})
    }

    render() {
        const {
            items, itemsLoading, itemsFetched, itemsErrorMessage, itemsMeta, resetFilters
        } = this.props;

        const min = renderHumanDistance(Math.min(...this.state.distances));
        const max = renderHumanDistance(Math.max(...this.state.distances));
        const total = renderHumanDistance(this.state.distances.reduce((a,b)=>a+b, 0));

        return (
            <div className="page">
                {itemsErrorMessage ? (
                    <div>{itemsErrorMessage}</div>
                ) : null}

                <Loading loaded={itemsFetched}>
                    <div className="dashboard-container">
                        <div className="inner-wrapper">
                            <div className="table-container card mt-2">
                                <WalksSummaryTable items={items}/>
                                <div className="footer p-0">
                                    <LinkTo
                                        button
                                        color="primary"
                                        href="walks/new"
                                        style={{padding:0}}
                                    >Добавить запись
                                    </LinkTo>
                                </div>
                            </div>
                            <div className="chart-container card mt-2 ml-1">
                                <h2 className="title">Суммарная активность</h2>
                                <WalksChart columns={this.state.chartColumns} onShowRoutes={x=>{this.onShowRoutes(x)}}/>
                                <div className="footer invert">
                                    <div className="minmax">
                                        <span>Минимум: {min}</span>
                                        <span className="ml-2">Максимум: {max}</span>
                                    </div>
                                    <span>Суммарно за {this.state.distances.length} дней:<br/>{total}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Loading>
                {!this.state.route ? null :
                    (
                        <Modal>
                            <YandexMap readonly route={this.state.route}/>
                            <Button
                                color="secondary"
                                style={{float:'right'}}
                                onClick={()=>this.setState({route: null})}
                            >Закрыть
                            </Button>
                        </Modal>
                    )
                }
            </div>
        );
    }
}

export default connect(({
walks: {
    items,
    itemsFetched,
    itemsLoading,
    itemsErrorMessage
}
}) => ({
    items,
    itemsFetched,
    itemsLoading,
    itemsErrorMessage
}), {
    fetchWalks: fetchWalksAction
})(DashboardPage);
