const WEEK_DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];

/**
 * Get an array of consecutive days from the gived date.
 * @param {Date} startDate The date from where the others should start.
 * @param {Number} days The amount of days you want.
 * @returns An array.
 */
export const getConsecutiveDays = (startDate, days) => {
  return new Array(days).fill(0).reduce((acc, _, i) => {
    const t = new Date(startDate.getTime());
    t.setDate(startDate.getDate() + i);
    return [...acc, resetHours(t)];
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
  return MONTHS[date.getMonth()];
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

/**
 * Increment the days numbers of a date.
 * @param {Date} date The date to increment the days.
 * @param {Number} index The amount of days to increment.
 * @returns A date.
 */
export const incrementDate = (date, index) => {
  return new Date(date.setDate(date.getDate() + index));
};

/**
 * Get the next sunday if the week end, else get the previous one.
 * @param {Date} date The reference date.
 * @returns A date.
 */
export const getRightSunday = (date) => {
  const weekDay = date.getDay();

  if (weekDay === 0) return resetHours(incrementDate(date, 1));
  if (weekDay >= 1 && weekDay <= 5) return resetHours(incrementDate(date, -weekDay + 1));
  if (weekDay === 6) return resetHours(incrementDate(date, 2));
};

/**
 * Get the next friday.
 * @param {Date} date The reference date.
 * @returns A date.
 */
export const getRightFriday = (date) => {
  const weekDay = date.getDay();

  if (weekDay === 6) return resetHours(incrementDate(date, 7));
  if (weekDay >= 1 && weekDay <= 5) return resetHours(incrementDate(date, 6 - weekDay));
  if (weekDay === 0) return resetHours(incrementDate(date, 6));
};

/**
 * Return an object of the start and end date interval of the week.
 * @returns An object.
 */
export const getWeekInterval = (date = new Date()) => {
  // ! Get sunday at 00:00 instead of monday at 00:01.
  const start = getRightSunday(date).toISOString();
  const end = getRightFriday(date).toISOString();

  return { start, end };
};

/**
 * Get the next monday from a date.
 * @param {Date} date The reference date.
 * @returns A date.
 */
export const getNextMonday = (date, baseDate = date) => {
  return date.getDay() === 1 && date.getDate() !== baseDate.getDate() ? date : getNextMonday(new Date(date.setDate(date.getDate() + 1)), baseDate);
};

/**
 * Get the last monday from a date.
 * @param {Date} date The reference date.
 * @returns A date.
 */
export const getLastMonday = (date, baseDate = date) => {
  return date.getDay() === 1 && date.getDate() !== baseDate.getDate() ? date : getLastMonday(new Date(date.setDate(date.getDate() - 1)), baseDate);
};
