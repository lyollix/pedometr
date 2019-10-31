import moment from 'moment';

export default function renderHumanDate(date) {
    const dataString = moment(date).locale('ru').format('dddd DD.MM.YYYY');
    return dataString.split(' ').map((x, i)=> i===0
        ? `<span>${x[0].toUpperCase()+x.slice(1)}</span>` : x).join(' ');
}
