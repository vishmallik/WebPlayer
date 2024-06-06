import { useRef } from "react";
import VideoJS from "./VideoJS";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import ArrowBackSharp from "@mui/icons-material/ArrowBackSharp";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import WatchList from "./WatchList";

export default function VideoPlayer() {
  const playerRef = useRef<Player | null>(null);
  const [playHistory, setPlayHistory] = useLocalStorage<string[]>(
    "playHistory",
    []
  );

  const { state } = useLocation();
  const navigate = useNavigate();
  const { mediaURL } = state;

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    muted: true,
    preload: "auto",
    sources: [
      {
        src: mediaURL,
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player: Player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("canplay", () => {
      const mediaIndex = playHistory.findIndex((url) => url === mediaURL);
      if (mediaIndex >= 0) {
        playHistory.splice(mediaIndex, 1);
      }

      playHistory.push(mediaURL);

      setPlayHistory(playHistory);
    });
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };
  return (
    <Container maxWidth="lg" className="h-fit">
      <Button
        variant="text"
        onClick={() => navigate("/", { state: { mediaURL } })}
      >
        <ArrowBackSharp />
      </Button>
      <div className="my-10">
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
      <WatchList />
    </Container>
  );
}
