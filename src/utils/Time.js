export default class Time {
  constructor(hours, mins) {
    this._hours = hours;
    this._mins = mins;
  }

  oneDigitToTwo(num) {
    return num < 10 ? `0${num}` : `${num}`;
  }

  get hours() {
    return this._hours;
  }

  get mins() {
    return this._mins;
  }

  get toString() {
    return `${this.oneDigitToTwo(this.hours)}:${this.oneDigitToTwo(this.mins)}`;
  }

  static getLocalDate = (date) => {
    return date.toLocaleString('fr', { timeZone: 'Europe/Paris' });
  };

  static getLocalDateDate = (date) => {
    return this.getLocalDate(date).split(' ')[0].split('/');
  };

  static getLocalDateTime = (date) => {
    return this.getLocalDate(date).split(' ')[2].split(':');
  };

  static getLocalHours = (date) => {
    return parseInt(this.getLocalDateTime(date)[0]);
  };

  static getLocalMins = (date) => {
    return parseInt(this.getLocalDateTime(date)[1]);
  };
}
