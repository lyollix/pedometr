const suffix = (value) => {
    const lastTwoDigit = value % 100;
    if (lastTwoDigit >= 11 && lastTwoDigit <= 14) return 'ов';
    const lastDigit = value % 10;
    if (lastDigit === 1) return '';
    if (lastDigit >= 2 && lastDigit <= 4) return 'а';
    return 'ов'
};

export default function renderHumanDistance(distance) {
    const km = Math.trunc(distance / 1000);
    const m = distance - km * 1000;
    const kmString = km > 0 ? `${km} километр${suffix(km)}`: '';
    const mString = m > 0 ? `${m} метр${suffix(m)}`: '';
    const space = km && m ? ' ' : '';
    return `${kmString}${space}${mString}`
}
