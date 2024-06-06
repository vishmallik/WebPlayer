import { useEffect, useRef } from "react";
import videojs from "video.js";

import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";
import "videojs-mobile-ui/dist/videojs-mobile-ui.css";
import "videojs-mobile-ui";
import "videojs-hls-quality-selector";

export interface VideoJsPlayerOptions {
  autoplay?: boolean;
  controls?: boolean;
  responsive?: boolean;
  fluid?: boolean;
  muted?: boolean;
  preload?: "none" | "auto" | "metadata" | undefined;
  sources: {
    src: string;
    type: string;
  }[];
}
type VideoJSProps = {
  options: VideoJsPlayerOptions;
  onReady: (player: Player) => void;
};
export const VideoJS = (props: VideoJSProps) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  const { options, onReady } = props;

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current!.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));
      (player as any).mobileUi();
      (player as any).qualityLevels();

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;
      player.preload(options.preload);
      player.muted(options.muted);
      player.autoplay(options.autoplay);
      player.src(options.sources);
      (player as any).mobileUi();
      (player as any).qualityLevels();
    }
  }, [options, videoRef]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJS;
