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
}
