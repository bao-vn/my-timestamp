class Time {
    constructor(unix, utc) {
        this.unix = unix;
        this.utc = utc;
    }
}

module.exports = {TimeDto: Time};