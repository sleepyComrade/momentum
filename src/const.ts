import sw1 from "./assets/sounds/Duel Of The Fates.mp3";
import sw2 from "./assets/sounds/Across The Stars (Love Theme).mp3";
import sw3 from "./assets/sounds/Anakin vs. Obi-Wan.mp3";
import sw4 from "./assets/sounds/Cantina Band.mp3";
import sw5 from "./assets/sounds/The Imperial March (Darth Vader's Theme).mp3";
import sw6 from "./assets/sounds/The Return Of The Jedi.mp3";

import side1 from "./assets/sounds/Stay Away.mp3";
import side2 from "./assets/sounds/BDE Bonus.mp3";
import side3 from "./assets/sounds/Gobbledigook.mp3";
import side4 from "./assets/sounds/Unsainted.mp3";
import side5 from "./assets/sounds/NHS.mp3";

import { ISettingsData } from "./interfaces";

export const playLists = {
  sw: [
    {
      title: 'Duel Of The Fates',
      src: sw1,
      duration: '04:14'
    },
    {
      title: 'Across The Stars (Love Theme)',
      src: sw2,
      duration: '05:32'
    },
    {
      title: 'Anakin vs. Obi-Wan',
      src: sw3,
      duration: '03:56'
    },
    {
      title: 'Cantina Band',
      src: sw4,
      duration: '02:44'
    },
    {
      title: `The Imperial March (Darth Vader's Theme)`,
      src: sw5,
      duration: '03:00'
    },
    {
      title: 'The Return Of The Jedi',
      src: sw6,
      duration: '05:03'
    }
  ],
  side: [
    {
      title: 'Stay Away',
      src: side1,
      duration: '03:14'
    },
    {
      title: 'BDE Bonus',
      src: side2,
      duration: '04:03'
    },
    {
      title: 'Gobbledigook',
      src: side3,
      duration: '03:05'
    },
    {
      title: 'Unsainted',
      src: side4,
      duration: '04:21'
    },
    {
      title: 'NHS',
      src: side5,
      duration: '03:26'
    }
  ]
}

export const defaultData: ISettingsData = {
  language: 'en',
  name: '',
  city: '',
  quotes: 'sw',
  music: 'sw',
  background: 'sw',
  tags: [],
  todo: [],
  widgets: [true, true, true, true, true, true, true],
  themes: [true, true]
}

export const getTimeOfDay = () => {
  const hours = new Date().getHours();
  const timesOfDay = ['night', 'morning', 'afternoon', 'evening'];
  return timesOfDay[Math.floor(hours / 6)];
}