/**
 *
 * @param {string} key The key you want to remove from the object.
 * @param {object} object The object you want to remove the key from.
 * @returns The object without the key.
 */
// eslint-disable-next-line no-unused-vars
export const removeKey = (key, { [key]: _, ...rest }) => rest;

/**
 *
 * @param {string} hour The time string. "hh:mm".
 * @returns {number} The hour of the string. (e.g. "15:30" > 15)
 */
export const getHour = (hour) => hour.split(':').map(parseFloat)[0];

/**
 *
 * @param {array} events An array of events object : { start: string, ?obligatory: string }.
 * @param {number} base The hour to search from.
 * @param {number} index The number it increment. (Positive or negative)
 * @param {*} curr
 * @returns {boolean|number} The hour on the extremity but close. (No gap)
 */
export const find = (events, base, index, curr = base) => {
  const next = events.find(({ start }) => parseFloat(start.split(':')[0]) === curr + index);
  if (!next) return base === curr ? false : curr;
  return find(events, base, index, curr + index);
};
