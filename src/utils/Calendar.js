const WEEK_DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];

export const getConsecutiveDays = (days = 14) => {
  let today = new Date();

  return new Array(days).fill(0).reduce((curr, acc, i) => {
    const t = new Date();
    t.setDate(today.getDate() + i);
    return [...curr, t];
  }, []);
};

export const sameDay = (day1, day2) => {
  return day1.getDate() === day2.getDate() && day1.getMonth() === day2.getMonth() && day1.getYear() === day2.getYear();
};

export const getWeekDay = (date) => {
  return WEEK_DAYS[date.getDay()];
};

export const getMonth = (date) => {
  return MONTHS[date.getDay()];
};
