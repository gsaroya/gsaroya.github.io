import { Howl, Howler } from 'howler';

// Global sfx object
const sounds = {
  Howler: Howler,
  clickSound: new Howl({
    src: ["/audio/click.mp3"],
    html5: true
  }),
  logonSound: new Howl({
    src: ["/audio/logon.mp3"],
    volume: 0.8,
    html5: true
  }),
  logoffSound: new Howl({
    src: ["/audio/logoff.mp3"],
    volume: 0.4,
    html5: true
  }),
  popSound: new Howl({
    src: ["/audio/pop1.mp3"],
    volume: 0.8,
    html5: true
  }),
  pop2Sound: new Howl({
    src: ["/audio/pop2.mp3"],
    volume: 0.8,
    html5: true
  }),
}

export default sounds;