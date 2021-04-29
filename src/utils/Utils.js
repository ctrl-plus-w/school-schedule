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
 * @returns {boolean|number} The hour on the extremity but close. Or false if their is not relations. (No gap)
 */
export const find = (events, base, index, curr = base) => {
  const next = events.find(({ start }) => parseFloat(start.split(':')[0]) === curr + index);
  if (!next) return base === curr ? false : curr;
  return find(events, base, index, curr + index);
};

/**
 * Get the `n - 1` to `n + 1` elements of the array at the `n` index.
 * @param {array} array The array to get the elements from.
 * @param {number} i The index of the middle element.
 * @returns An array of three elements.
 */
export const destructure = (array, i) => [array[i - 1], array[i], array[i + 1]];

/**
 * Check if an array contains another array. The format of the included array must be [Number, Number];
 * @param {Array} array The array to find the other array in.
 * @param {Array} includedArray The array that should be find. Format : [Number, Number]
 * @returns A boolean.
 */
export const arrayInclude = (array, [col, row]) => array.some(([col_, row_]) => col_ === col && row_ === row);
