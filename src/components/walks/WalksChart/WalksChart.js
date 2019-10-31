import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
import C3Chart from 'react-c3js';
import 'c3/c3.css';
import {Button} from '@/helpers';
import {renderHumanDate} from '@/utils'

let date;

const d = {
    x: 'x',
    xFormat: '%d.%m.%Y',
    columns: [
        ['x', '01.01.2013', '02.01.2013', '03.01.2013', '04.01.2013', '05.01.2013', '06.01.2013'],
        ['distance', 30, 200, 100, 400, 150, 250]
    ],
    colors: {
        'distance': '#ec174f'
    },
    labels: {
        format: function (v, id, i, j) { return `${v}м`; }
    },
    onclick: (a, b) => {
        const elPop = document.querySelector('#popup');
        const elDate = elPop.querySelector('.walk-date');
        const elVal = elPop.querySelector('.distance .value');
        const elBtn = elPop.querySelector('.btn');
        elPop.style.top = `${b.cy.animVal.value-48}px`;
        elPop.style.left = `${b.cx.animVal.value+68}px`;
        elVal.innerText = a.value;
        elDate.innerHTML = renderHumanDate(a.x);
        elBtn.onclick=function() {
            date = moment(a.x).format('DD.MM.YYYY');
        };
        elPop.style.display = 'block'
    }
};

const axis =  {
    x: {
        type: 'timeseries',
        tick: {
            format: '%d.%m.%Y'
        }
    }
};

const grid = {
    y: { show: true }
};

const point = {
    r: 5,
    focus: {
        expand: {
            r: 10
        }
    }
};

function WalksChart({ columns, onShowRoutes }) {
    return (
        <div className="walks-chart">
            <C3Chart
                data={{...d, columns}}
                axis={axis}
                grid={grid}
                zoom={{enabled: true}}
                legend={{show: false}}
                point={point}
                tooltip={{show: false}}
            />
            <div id="popup">
                <p className="walk-date"/>
                <p className="distance">
                    <span className="value"> </span>
                    <span>м</span>
                </p>
                <Button onClick={()=>onShowRoutes(date)} color="primary">Показать на карте</Button>
            </div>
        </div>
    );
}

WalksChart.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.array).isRequired,
    onShowRoutes: PropTypes.func
};

WalksChart.defaultProps = {
    itemErrorMessage: null,
    onShowRoutes: null
};

export default WalksChart;
