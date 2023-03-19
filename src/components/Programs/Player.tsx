
import { useEffect, useRef, useState } from "react";
import OSButton from "../UI/Button";
import loadImage from "../UI/LoadImage";
import Spinner from "../UI/Spinner";
import "./Player.scss";

interface PlayerProps {
  src: string;
  type: string;
  sound: boolean;
  toggleSound: () => void;
}

function ProgramPlayer(props: PlayerProps) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const poster = props.type.startsWith("audio") ? "/img/icons/files/audio.svg" : "/img/icons/files/video.svg";

  useEffect(() => {
    const setPlayingTrue = () => setPlaying(true);
    const setPlayingFalse = () => setPlaying(false);
    const handlePlaying = () => {
      if (ref.current) {
        setProgress(100 * ref.current.currentTime / ref.current.duration);
      }
    }
    if (ref.current) {
      ref.current.addEventListener("playing", setPlayingTrue);
      ref.current.addEventListener("pause", setPlayingFalse);
      ref.current.addEventListener("timeupdate", handlePlaying);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("playing", setPlayingTrue);
        ref.current.removeEventListener("pause", setPlayingFalse);
        ref.current.removeEventListener("timeupdate", handlePlaying);
      }
    }
  }, [ref, ref.current, loaded])

  const play = () => {
    if (ref.current) {
      ref.current.volume = 0.1;
      ref.current.play();
    }
  }
  const pause = () => {
    if (ref.current) ref.current.pause();
  }
  const stop = () => {
    if (ref.current) {
      ref.current.pause();
      ref.current.currentTime = 0;
    }
  }
  const skipBackward = () => {
    if (ref.current) {
      ref.current.currentTime = 0;
    }
  }
  const skipForward = () => {
    if (ref.current) {
      ref.current.currentTime = ref.current.duration;
    }
  }

  const images = [
    loadImage("/img/icons/media/playback-pause.svg"),
    loadImage("/img/icons/media/playback-start.svg"),
    loadImage("/img/icons/media/playback-stop.svg"),
    loadImage("/img/icons/media/skip-backward.svg"),
    loadImage("/img/icons/media/skip-forward.svg"),
  ];
  if (!loaded || !images.every(src => src)) return <Spinner setDone={setLoaded} style={{ height: "100%", width: "100%" }} />;

  return (
    <div className="player-component">
      <div className="player-content">
        <video ref={ref} poster={poster} muted={!props.sound} playsInline={true} controls={false}>
          <source src={props.src} type={props.type} />
          Your browser does not support HTML5 video.
        </video>
      </div>
      <div className="player-seek">
        <div className="player-seek-track">
          <div className="player-seek-thumb" style={{ left: `calc(${progress}% - 0.5em)`, top: `-0.2em` }}></div>
        </div>
      </div>
      <div className="player-buttons">
        {playing ?
          <OSButton muted={true} link="" onClick={pause}><img src="/img/icons/media/playback-pause.svg" alt="pause" className="player-media-button" /></OSButton>
          : <OSButton muted={true} link="" onClick={play}><img src="/img/icons/media/playback-start.svg" alt="play" className="player-media-button" /></OSButton>
        }
        <OSButton muted={true} link="" onClick={stop}><img src="/img/icons/media/playback-stop.svg" alt="stop" className="player-media-button" /></OSButton>
        <OSButton muted={true} link="" onClick={skipBackward}><img src="/img/icons/media/skip-backward.svg" alt="stop" className="player-media-button" /></OSButton>
        <OSButton muted={true} link="" onClick={skipForward}><img src="/img/icons/media/skip-forward.svg" alt="stop" className="player-media-button" /></OSButton>
        <OSButton muted={true} link="" onClick={props.toggleSound}><img src={props.sound ? "/img/icons/media/audio-on.svg" : "/img/icons/media/audio-off.svg"} alt="Sound icon" className="player-audio-button" /></OSButton>
      </div>
    </div>
  );
}

export default ProgramPlayer;
