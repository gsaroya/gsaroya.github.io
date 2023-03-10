import { useState, useEffect } from "react";

const loadImage = (src: string, video: boolean = false) => {
  const [sourceLoaded, setSourceLoaded] = useState<string>();

  useEffect(() => {
    if (!video) {
      const img = new Image();
      img.src = src;
      img.onload = () => setSourceLoaded(src);
    } else {
      const video = document.createElement('video');
      video.src = src;
      video.onloadeddata = () => setSourceLoaded(src);
    }
  }, [src]);

  return sourceLoaded;
};

export default loadImage;