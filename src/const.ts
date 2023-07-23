export const greetings = {
  en: {
    night: 'Good night',
    morning: 'Good morning',
    afternoon: 'Good afternoon',
    evening: 'Good evening',
    placeholder: '[Enter name]'
  },
  ru: {
    night: 'Доброй ночи',
    morning: 'Доброе утро',
    afternoon: 'Добрый день',
    evening: 'Добрый вечер',
    placeholder: '[Введите имя]'
  }
};

export const getTimeOfDay = () => {
  const hours = new Date().getHours();
  const timesOfDay = ['night', 'morning', 'afternoon', 'evening'];
  return timesOfDay[Math.floor(hours / 6)];
}