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

export interface ITodoData {
  task: string,
  state: boolean
}

export interface ISettingsData {
  language: string;
  name: string;
  city: string;
  quotes: string;
  music: string;
  background: string;
  tags: string[];
  todo: ITodoData[];
  widgets: boolean[];
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

export interface ITrack {
  title: string;
  src: typeof module;
  duration: string;
}

export interface ISettingsLangOptions {
  [en: string]: { [lang0: string]: string; lang1: string };
  ru: { lang0: string; lang1: string };
}

export interface ISectionTitles {
  [en: string]: {
    [title0: string]: string;
    title1: string;
    title2: string;
    title3: string;
  };
  ru: { title0: string; title1: string; title2: string; title3: string };
}

export interface ITagsPlaceholder {
  [en: string]: { [add: string]: string; full: string };
  ru: { add: string; full: string };
}

export interface ISimpleLang {
  [en: string]: string;
  ru: string;
}

export interface IWidgetsTitles {
  [en: string]: {
    [name0: string]: string;
    name1: string;
    name2: string;
    name3: string;
    name4: string;
    name5: string;
    name6: string;
  },
  ru: {
    name0: string;
    name1: string;
    name2: string;
    name3: string;
    name4: string;
    name5: string;
    name6: string;
  }
}
