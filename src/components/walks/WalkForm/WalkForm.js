import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, change } from 'redux-form';

import { WALK_FORM } from '../../../constants/Form';
import {
    Button, LinkTo, renderField, renderTextareaField, renderDatePicker
} from '@/helpers';
import { renderHumanDistance } from '@/utils';
import { YandexMap } from "../../common";
import IconMap from '@/assets/images/map-alt.svg';

class WalkForm extends Component {
    static propTypes = {
        item: PropTypes.shape({
            id: PropTypes.number,
            distance: PropTypes.number
        }),
        errorMessage: PropTypes.string,
        onSubmit: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        initialize: PropTypes.func.isRequired
    };

    static defaultProps = {
        item: null,
        errorMessage: null
    };

    componentDidMount() {
        const { item, initialize } = this.props;
        if (item) {
            initialize({
                id: item.id,
                date: item.date,
                distance: item.distance,
                route: item.route,
                comment: item.comment
            });
        }
    }

    handleMap({ distance, route }) {
        this.props.dispatch(change(WALK_FORM, 'distance', distance));
        this.props.dispatch(change(WALK_FORM, 'route', route));
    }

    render() {
        const {
            item, errorMessage, handleSubmit, onSubmit
        } = this.props;

        return errorMessage ?
            (
                <div className="alert danger">
                    {errorMessage}
                </div>
            ) : (
                <div className="form-container">
                    <form className="walk-form relative" onSubmit={handleSubmit(values => onSubmit(values))}>

                        <div className="mb-2">
                            <div className="alert info" style={{display: 'flex'}}>
                                <IconMap width={24} height={24} style={{marginRight:'1rem'}}/>
                                Отредактируйте маршрут на карте, затем нажмите на кнопку "Пересчитать расстояние"
                                для обновления данных в полях формы
                            </div>
                        </div>

                        <div className="space-between start fill mb-1">
                            <Field
                                key="date"
                                name="date"
                                component={renderDatePicker}
                                label="Дата"
                            />
                            <Field
                                required
                                number
                                key="distance"
                                name="distance"
                                component={renderField}
                                label="Дистанция"
                                format={(value, name)=>renderHumanDistance(value)}
                                disabled
                                inputClassName="inline"
                            />
                        </div>

                        <div className="space-between start fill mb-1">
                            <Field
                                key="comment"
                                name="comment"
                                component={renderTextareaField}
                                label="Комментарий"
                                cols={20}
                                rows={8}
                            />
                            <Field
                                key="route"
                                name="route"
                                component={renderTextareaField}
                                label="Маршрут"
                                format={(value, name)=>JSON.stringify(value)}
                                cols={20}
                                rows={8}
                                disabled
                            />
                        </div>
                        <div className="form-group form-actions">
                            <LinkTo button color="secondary" icon="times-circle" href="">Отменить</LinkTo>
                            <Button submit color="success" icon="save">Сохранить</Button>
                        </div>
                    </form>
                    <YandexMap route={item && item.route} handleMap={(x)=>this.handleMap(x)}/>
                </div>
            );
    }
}

function validate({ date, distance }) {
    const errors = {};

    if (!date) {
        errors.date = 'Пожалуйста введите дату';
    }

    if (!distance) {
        errors.distance = 'Пожалуйста введите дистанцию';
    }

    return errors;
}

export default reduxForm({ form: WALK_FORM, validate })(WalkForm);
