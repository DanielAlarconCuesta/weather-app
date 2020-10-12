import moment from 'moment';

export function isNull(element) {
    if (typeof(element) == "undefined" || element == null) {
        return true;
    }

    return false;
}

export function getFormattedTime(args) {
    
    let error = Error('Provided timestamp is wrong');
    let { timestamp, timezone } = args || {};

    timezone = parseInt(timezone, 10);
    timestamp = parseInt(timestamp, 10);
    
    if (!timestamp) {
        return error;
    }

    if (!timezone) {
        timezone = 0;
    }

    let millisecons = (timestamp + timezone) * 1000;
    let date = new Date(millisecons);

    if (isNull(date) || !(date instanceof Date)) {
        return error;
    }
    
    const length = 2;
    let hour = padLeftZeroes({number: date.getUTCHours(), length: length});
    let minutes = padLeftZeroes({number: date.getUTCMinutes(), length: length});

    return hour + ":" + minutes + (timezone === 0 ? ' UTC±00:00' : '');
}

export function padLeftZeroes(args) {

    let { number, length } = args || {};

    let error = Error("number to paddle not specified");
    
    if (!length) {
        length = 2;
    }
    
    number = parseInt(number);

    if (isNaN(parseInt(number))) {
        return error;
    }
    
    number = number.toString();
    while (number.length < length) {
        number = '0' + number;
    }
    
    return number;
}