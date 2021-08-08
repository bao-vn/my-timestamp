var moment = require('moment');

// prevent Deprecation warningn of moment.js: value provided is not in a recognized RFC2822 or ISO format
const isDateString = (date) => {
    return (typeof(Date.parse(date)) === 'number');
}

/**
 * @description check format date unix or utc
 */
const isDate = (date) => {
    console.log("isDate: " + date);

    const regexString = /^\D+$/g;
    const regexDate = /^\d{4}-\d{2}-\d{2}$/g;
    const regexNum = /^\d+$/g;

    if (regexString.test(date)) {
        return -1;
    }

    if (regexNum.test(date)) {
        return 0;
    } else if (regexDate.test(date) || isDateString(date)) {
        return 1;
    } else {
        console.log('This is not a date');
        return -1;
    }
}

module.exports = {
    isDate
};