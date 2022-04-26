import { BwAudio } from './BwAudio';

const audioList = [
  {
    id: 1,
    name: '卡通滑动点击按钮音效',
    url: '/static/sound/01.wav',
  },
  {
    id: 2,
    name: '叮按钮点击音效',
    url: '/static/sound/02.wav',
  },
];

export const bwAudio = new BwAudio();
bwAudio.init(audioList);

const playSound = {
  click: () => void bwAudio.play(1),
  ding: () => void bwAudio.play(2),
};

export default playSound;
