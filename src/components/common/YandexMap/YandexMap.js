import React, { Component } from 'react';
import ymaps from 'ymaps';
import PropTypes from "prop-types";

export default class YandexMap extends Component {
    static propTypes = {
        readonly: PropTypes.bool,
        route: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
        handleMap: PropTypes.func
    };

    static defaultProps = {
        readonly: false,
        route: null,
        handleMap: null
    };

    componentDidMount() {
        const b = this.refs.map.getBoundingClientRect();
        const { width, height } = b;
        ymaps
            .load('https://api-maps.yandex.ru/2.1/?apikey=af8bf4ad-fcdd-49ac-a4b7-8549043de2f6&lang=ru_RU')
            .then(maps => {
                maps.geolocation.get().then((res) => {
                    const bounds = res.geoObjects.get(0).properties.get('boundedBy');
                    const mapState = maps.util.bounds.getCenterAndZoom(bounds, [width, height]);
                    this.createMap(maps, mapState);
                }, function (e) {
                    this.createMap(maps,{
                        center: [55.751574, 37.573856],
                        zoom: 9
                    });
                });
            })
            .catch(error => console.log('Failed to load Yandex Maps', error));
    }

    componentWillUnmount() {
        if (this.localMap) {
            this.localMap.destroy();
            this.localMap = null
        }
    }

    createMap(maps, state) {
        const route = this.props.route || [
            state.center,
            [state.center[0]+.005, state.center[1]+.005]
        ];
        this.localMap = new maps.Map(
            this.refs.map,
            {...state, controls: ['zoomControl', 'fullscreenControl']},
            {searchControlProvider: 'yandex#search'}
        );
        this.polyline = new maps.Polyline(route, {}, {
            strokeColor: "#ec174f",
            draggable: !this.props.readonly,
            strokeWidth: 6
        });
        this.localMap.geoObjects.add(this.polyline);
        this.localMap.setBounds(this.polyline.geometry.getBounds());
        if (!this.props.readonly) this.polyline.editor.startEditing();
    }

    calcDistance() {
        const geometry = this.polyline.geometry,
            points = geometry.getCoordinates(),
            coordSystem = this.localMap.options.get('projection').getCoordSystem();

        let distance = 0;

        for (let i = 0, k = geometry.getLength() - 1; i < k; i++) {
            distance += coordSystem.getDistance(points[i], points[i + 1]);
        }
        return {
            distance: Math.round(distance),
            route: this.polyline.geometry.getCoordinates()
        };
    }

    render() {
        return (
            <div className="map-container">
                <div className='map' ref="map"/>
                {this.props.readonly ? null : (
                    <button
                        className="btn btn-primary"
                        type="button"
                        style={{width:'100%', cursor:'pointer'}}
                        onClick={()=>this.props.handleMap(this.calcDistance())}
                    >Пересчитать расстояние
                    </button>
                )}
            </div>
        )
    }
}
