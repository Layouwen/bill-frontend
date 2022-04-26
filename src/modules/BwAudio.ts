type BwAudioList = {
  id: number;
  name: string;
  url: string;
}[];

export class BwAudio {
  private soundVolume = 0.1;
  private audio?: HTMLAudioElement;

  constructor(private list?: BwAudioList) {}

  public init(list: BwAudioList) {
    this.createAudio();
    this.list = list;
  }

  public setSoundVolume(volume: number) {
    this.soundVolume = volume;
  }

  private createAudio = () => {
    const audio = new Audio();
    audio.volume = this.soundVolume;
    this.audio = audio;
  };

  public async play(param: number | string) {
    if (!this.list || !this.audio) return;
    const findAudio = this.list.find((i) =>
      typeof param === 'number' ? i.id === param : i.name === param,
    );

    if (!findAudio) return;

    this.audio.src = findAudio.url;
    try {
      await this.audio.play();
    } catch (e) {
      console.log(`findAudio.url: ${findAudio.url} error`);
      alert(`findAudio.url: ${findAudio.url} error`);
      console.error(e);
    }
  }
}
