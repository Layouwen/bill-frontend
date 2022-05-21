import { AudioWeb } from './AudioWeb';

export const audioWeb = new AudioWeb();

const playSound = {
  click: () => void audioWeb.play('1'),
  ding: () => void audioWeb.play('2'),
  turnPage: () => void audioWeb.play('4'),
};

export default playSound;
