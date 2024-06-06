import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WatchList from "./WatchList";

export default function Home() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [input, setInput] = useState(state?.mediaURL || "");
  const [showAlertMsg, setShowAlertMsg] = useState("");

  function handlePlay() {
    if (!input || !input.includes("http")) {
      setShowAlertMsg("Please enter a valid URL to continue!");

      return;
    }
    navigate("/player", { state: { mediaURL: input } });
  }

  return (
    <Container maxWidth="lg" className="h-full">
      <h1 className="text-center font-semibold text-2xl py-6">
        Web Stream Player
      </h1>
      <h2 className="text-center text-sm">Enter media URL to get Started</h2>
      <div className=" mx-auto h-full">
        <div className="py-4 space-x-4 flex items-center my-4">
          <TextField
            id="standard-basic"
            label="Enter URL"
            variant="filled"
            size="small"
            fullWidth
            value={input}
            onChange={({ target }) => setInput(target.value)}
            className="text-white"
            type="text"
            color="secondary"
            sx={{
              "& .MuiFilledInput-root": {
                backgroundColor: "white",
              },
            }}
          />

          <Button
            variant="contained"
            onClick={handlePlay}
            size="large"
            color="secondary"
          >
            Play
          </Button>
        </div>
        {showAlertMsg && <Alert severity="warning">{showAlertMsg}</Alert>}
        <WatchList />
      </div>
    </Container>
  );
}
