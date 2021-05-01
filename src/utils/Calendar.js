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

  if (weekDay === 0) return resetHours(date);
  if (weekDay >= 1 && weekDay <= 5) return resetHours(incrementDate(date, -weekDay));
  if (weekDay === 6) return resetHours(incrementDate(date, 1));
};

/**
 * Get the next friday.
 * @param {Date} date The reference date.
 * @returns A date.
 */
export const getRightFriday = (date) => {
  const weekDay = date.getDay();

  if (weekDay === 6) return resetHours(incrementDate(date, 6));
  if (weekDay >= 1 && weekDay <= 5) return resetHours(incrementDate(date, 5 - weekDay));
  if (weekDay === 0) return resetHours(incrementDate(date, 5));
};

/**
 * Return an object of the start and end date interval of the week.
 * @returns An object.
 */
export const getWeekInterval = () => {
  const date = new Date();

  // ! Get sunday at 00:00 instead of monday at 00:01.
  const start = getRightSunday(date).toISOString();
  const end = getRightFriday(date).toISOString();

  return { start, end };
};
