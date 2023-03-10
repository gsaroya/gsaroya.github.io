let sounds = {
  // ctx: new (window.AudioContext || window.webkitAudioContext)(),
  clickSound: new Audio('/audio/click.mp3'),
  logonSound: new Audio('/audio/logon.mp3'),
  logoffSound: new Audio('/audio/logoff.mp3'),
  popSound: new Audio('/audio/pop1.mp3'),
  playClickSound: () => {
    sounds.clickSound.currentTime = 0;
    if (localStorage.getItem("sound") != "false") sounds.clickSound.play();
    // const source = sounds.ctx.createBufferSource();
    // source.buffer = sounds.audio_buf;
    // source.connect(sounds.ctx.destination);
    // source.start(0);
  },
  playLogonSound: () => {
    // sounds.logonSound.currentTime = 0;
    if (localStorage.getItem("sound") != "false") sounds.logonSound.play();
  },
  playLogoffSound: () => {
    // sounds.logoffSound.currentTime = 0;
    if (localStorage.getItem("sound") != "false") sounds.logoffSound.play();
  },
  playPopSound: () => {
    sounds.popSound.currentTime = 0;
    if (localStorage.getItem("sound") != "false") sounds.popSound.play();
  }
}

// sounds.data_buf = await fetch("/audio/click.mp3").then( resp => resp.arrayBuffer() );
// sounds.audio_buf = await sounds.ctx.decodeAudioData(sounds.data_buf);

export default sounds;