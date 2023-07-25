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

export const weather = {
  en: {
    windSpeed: 'Wind speed',
    metric: 'm/s',
    humidity: 'Humidity',
    placeholder: '[Enter city]',
    defaultCity: 'Minsk',
    emptyInputError: 'Error! Please enter city!',
    cityError1: 'Error! city not found for',
    cityError2: ''
  },
  ru: {
    windSpeed: 'Скорость ветра',
    metric: 'м/с',
    humidity: 'Влажность',
    placeholder: '[Введите город]',
    defaultCity: 'Минск',
    emptyInputError: 'Ошибка! Пожалуйста, введите город!',
    cityError1: 'Ошибка! Город',
    cityError2: ' не найден'
  }
}

export const getTimeOfDay = () => {
  const hours = new Date().getHours();
  const timesOfDay = ['night', 'morning', 'afternoon', 'evening'];
  return timesOfDay[Math.floor(hours / 6)];
}