import LaunchOutlined from "@mui/icons-material/LaunchOutlined";
import Delete from "@mui/icons-material/Delete";
import DeleteForeverOutlined from "@mui/icons-material/DeleteForeverOutlined";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Link } from "react-router-dom";

export default function WatchList() {
  const [playHistory, setPlayHistory] = useLocalStorage<string[]>(
    "playHistory",
    []
  );
  function handleDelete(url: string) {
    setPlayHistory(playHistory.filter((mediaUrl) => mediaUrl !== url));
  }

  return (
    <div className="text-center py-10 h-full">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl font-semibold">Watch History</h3>
        <Button
          onClick={() => setPlayHistory([])}
          variant="outlined"
          size="small"
          color="error"
        >
          <p>Delete All</p>
          <DeleteForeverOutlined />
        </Button>
      </div>
      <List
        component="ul"
        className="h-[600px] overflow-y-auto bg-white rounded-md"
      >
        {playHistory?.length > 0 ? (
          playHistory.map((url: string, index: number) => (
            <div key={url}>
              <ListItem>
                <Link
                  to={"/player"}
                  state={{ mediaURL: url }}
                  className="flex justify-between items-center"
                >
                  <ListItemText primary={`${index + 1}. `} className="mr-4" />
                  <ListItemText primary={url} className="break-all" />
                  <ListItemButton>
                    <ListItemIcon>
                      <LaunchOutlined />
                    </ListItemIcon>
                  </ListItemButton>
                </Link>
                <ListItemButton onClick={() => handleDelete(url)}>
                  <ListItemIcon>
                    <Delete />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          ))
        ) : (
          <li>No History Found</li>
        )}
      </List>
    </div>
  );
}
