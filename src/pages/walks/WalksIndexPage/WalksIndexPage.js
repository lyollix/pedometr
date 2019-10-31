import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reset as resetFiltersAction } from 'redux-form';
import { NavLink } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

import {
    fetchWalks as fetchWalksAction,
    deleteWalk as deleteWalkAction
} from '@/actions/WalkActions';

import { WALKS_FILTER_FORM } from '@/constants/Form';
import { WalksFilterForm, WalksTable } from '@/components';
import { Loading, LinkTo, Modal, Button } from '@/helpers';
import IconHome from '@/assets/images/home.svg';

class WalksIndexPage extends Component {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired
        })).isRequired,
        itemsLoading: PropTypes.bool.isRequired,
        itemsFetched: PropTypes.bool.isRequired,
        itemsErrorMessage: PropTypes.string,
        fetchWalks: PropTypes.func.isRequired,
        deleteWalk: PropTypes.func.isRequired,
        resetFilters: PropTypes.func.isRequired
    };

    static defaultProps = {
        itemsErrorMessage: null
    };

    state = {
        items: [],
        filters: {},
        deleteItem: null
    };

    componentDidMount() {
        this.fetchData()
            .then(({items})=>{this.setState({items})});
    }

    fetchData(page = 1) {
        return this.props.fetchWalks({
            page, filters: this.state.filters
        });
    }

    onSearch() {
        if (!this.state.filters.id) return;
        let f = this.props.items.filter(x => x.id==this.state.filters.id);
        this.setState({items: f})
    }

    render() {
        const {
            itemsLoading, itemsFetched, itemsErrorMessage, itemsMeta, resetFilters
        } = this.props;
        const {items}=this.state;
        return (
            <div className="page">
                <ul className="breadcrumbs">
                    <li className="breadcrumb-item">
                        <NavLink to="/">
                            <IconHome width={17} height={17}/>
                        </NavLink>
                    </li>
                    <li className="breadcrumb-item active">Прогулки</li>
                </ul>

                <div className='space-between'>
                    <h1>Прогулки</h1>

                    <div className="actions">
                        <LinkTo
                            button
                            color="primary"
                            addClass=""
                            href="walks/new"
                        >Добавить запись
                        </LinkTo>
                    </div>
                </div>

                {itemsErrorMessage ? (
                    <div>{itemsErrorMessage}</div>
                ) : null}

                <div className="card mt-2 p-1">
                    <WalksFilterForm
                        walks={items}
                        isLoading={itemsLoading}
                        onSearch={() => this.onSearch()}
                        onReset={() => {
                            resetFilters(WALKS_FILTER_FORM);
                            this.setState({ filters: {} }, ()=>this.setState({items: this.props.items}));
                        }}
                        onChange={values => this.setState({ filters: values })}
                    />
                </div>

                <div className="card mt-2">
                    <Loading loaded={!itemsLoading}>
                        <WalksTable
                            items={items}
                            onDelete={item => this.setState({ deleteItem: item })}
                        />
                    </Loading>
                </div>
                { !this.state.deleteItem ? null :
                    (
                        <Modal>
                            <div className="p-1">
                            <h2 style={{textAlign:'center', paddingBottom:'1rem'}}>Удаление прогулки</h2>
                            <p className="mb-2" style={{textAlign: 'center'}}>
                                Вы действительно хотите удалить<br/>
                                прогулку ID={this.state.deleteItem.id} ?
                            </p>
                            <Button color="secondary" onClick={()=>this.setState({deleteItem:null})}>Отмена</Button>
                            <Button addClass="ml-1" color="danger" onClick={()=>{
                                this.props.deleteWalk(this.state.deleteItem.id)
                                    .then(() => toastr.warning('Удаление прогулки', `Прогулка ${this.state.deleteItem.id} успешно удалена`))
                                    .then(() => this.setState({deleteItem:null}))
                                    .then(() => this.fetchData())
                            }}>Удалить</Button>
                            </div>
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
    fetchWalks: fetchWalksAction,
    deleteWalk: deleteWalkAction,
    resetFilters: resetFiltersAction
})(WalksIndexPage);
