export interface ILangGreetings {
  [en: string]: {
    [night: string]: string;
    morning: string;
    afternoon: string;
    evening: string;
    placeholder: string;
  };
  ru: {
    night: string;
    morning: string;
    afternoon: string;
    evening: string;
    placeholder: string;
  };
}

export interface ISettingsData {
  language: string;
  name: string;
  city: string;
  quotes: string;
}

export interface ILangWeather {
  [en: string]: {
    windSpeed: string;
    metric: string;
    humidity: string;
    placeholder: string;
    defaultCity: string;
    emptyInputError: string;
    cityError1: string;
    cityError2: string;
  };
  ru: {
    windSpeed: string;
    metric: string;
    humidity: string;
    placeholder: string;
    defaultCity: string;
    emptyInputError: string;
    cityError1: string;
    cityError2: string;
  };
}
