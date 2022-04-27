import { AUDIO_LIST } from '@/constants';
import axios from 'axios';

export class AudioWeb {
  private canPlay = false;
  private audioContext: AudioContext;
  private bufferMap = new Map<string, AudioBuffer>();

  constructor() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const AudioContext: { new (): AudioContext } =
      window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
  }

  close() {
    this.canPlay = false;
  }

  open() {
    this.canPlay = true;
  }

  async play(id: string) {
    const buffer = this.bufferMap.get(id);
    if (!buffer || !this.canPlay) return;
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);
    source.start();
  }

  download() {
    return new Promise((resolve) => {
      const res = {
        success: 0,
        failName: [] as string[],
      };
      const cache = {} as { [key: string]: string };
      AUDIO_LIST.forEach(({ id, name, url }) => {
        axios
          .get(url, { responseType: 'arraybuffer' })
          .then(async ({ data }) => {
            cache[id] = this.arrayBuffer2string(data);
            const audioBuffer = await this.arrayBuffer2AudioBuffer(data);
            this.bufferMap.set(id + '', audioBuffer);
            res.success++;
          })
          .catch(() => {
            res.failName.push(name);
          })
          .finally(() => {
            if (res.success + res.failName.length === AUDIO_LIST.length) {
              localStorage.setItem('audioCache', JSON.stringify(cache));
              resolve(res);
            }
          });
      });
    });
  }

  loadCache() {
    const cacheString = localStorage.getItem('audioCache');
    if (!cacheString) return;
    const cache = JSON.parse(cacheString);
    Object.keys(cache).forEach((id) => {
      const arrayBuffer = this.string2arrayBuffer(cache[id]);
      this.arrayBuffer2AudioBuffer(arrayBuffer).then((res) => {
        this.bufferMap.set(id, res);
      });
    });
  }

  clearCache() {
    if (!this.bufferMap.size) this.bufferMap.clear();
    localStorage.removeItem('audioCache');
  }

  private arrayBuffer2AudioBuffer(buffer: ArrayBuffer) {
    return new Promise((resolve: (res: AudioBuffer) => void) => {
      void this.audioContext.decodeAudioData(buffer, (res) => {
        resolve(res);
      });
    });
  }

  private arrayBuffer2string = (buffer: ArrayBuffer): string => {
    return String.fromCharCode.apply(
      null,
      new Uint16Array(buffer) as unknown as number[],
    );
  };

  private string2arrayBuffer = (string: string): ArrayBuffer => {
    const buffer = new ArrayBuffer(string.length * 2);
    const bufferView = new Uint16Array(buffer);
    for (let i = 0, strLen = string.length; i < strLen; i++) {
      bufferView[i] = string.charCodeAt(i);
    }
    return buffer;
  };
}
