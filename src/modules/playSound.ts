import { AudioWeb } from './BwAudio';

export const audioWeb = new AudioWeb();
void audioWeb.download();

const playSound = {
  click: () => void audioWeb.play('1'),
  ding: () => void audioWeb.play('2'),
};

export default playSound;
