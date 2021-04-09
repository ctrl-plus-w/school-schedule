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
  switch (date.getDay()) {
    case 0:
      return 'Dimanche';
    case 1:
      return 'Lundi';
    case 2:
      return 'Mardi';
    case 3:
      return 'Mercredi';
    case 4:
      return 'Jeudi';
    case 5:
      return 'Vendredi';
    default:
      return 'Samedi';
  }
};
