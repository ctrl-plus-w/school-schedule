const WEEK_DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];

/**
 * Get an array of consecutive days.
 * @param {number} days
 * @returns An array.
 */
export const getConsecutiveDays = (days = 14) => {
  let today = new Date();

  return new Array(days).fill(0).reduce((curr, acc, i) => {
    const t = new Date();
    t.setDate(today.getDate() + i);
    return [...curr, t];
  }, []);
};

/**
 * Verify if two days are the same date.
 * @param {Date} day1 The first day.
 * @param {Date} day2 The second day.
 * @returns A boolean.
 */
export const sameDay = (day1, day2) => {
  return day1.getDate() === day2.getDate() && day1.getMonth() === day2.getMonth() && day1.getYear() === day2.getYear();
};

/**
 * Get the (french) week day from a date.
 * @param {Date} date The date to get the day from.
 * @returns A string.
 */
export const getWeekDay = (date) => {
  return WEEK_DAYS[date.getDay()];
};

/**
 * Get the (french) month from a date.
 * @param {Date} date The date to get the month from.
 * @returns A string.
 */
export const getMonth = (date) => {
  return MONTHS[date.getDay()];
};

/**
 * Reset the hours, the mins, the secs and the ms from a date.
 * @param {Date} date The date to reset the hours from.
 * @returns A date.
 */
export const resetHours = (date) => {
  date.setHours(0, 0, 0, 0);
  return date;
};
