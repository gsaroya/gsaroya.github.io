import { Howl, Howler } from 'howler';

const sounds = {
  clickSound: new Howl({
    src: ["/audio/click.mp3"],
  }),
  logonSound: new Howl({
    src: ["/audio/logon.mp3"],
    volume: 0.8,
  }),
  logoffSound: new Howl({
    src: ["/audio/logoff.mp3"],
    volume: 0.4,
  }),
  popSound: new Howl({
    src: ["/audio/pop1.mp3"],
    volume: 0.8,
  }),
}

export default sounds;