import moment from 'moment';

export default function renderHumanTime(date) {
    return moment(date).locale('ru').format('LT');
}
