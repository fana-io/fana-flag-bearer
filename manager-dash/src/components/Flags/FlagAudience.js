import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete"
import { Link } from "react-router-dom"

export const FlagAudience = ({ audience, removeAudience }) => {
  const link = "/audiences/" + audience.ID;
  console.log('audience', audience)
  return (
    <ListItem divider
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => removeAudience(audience.key)} >
          <DeleteIcon/>
        </IconButton>
      }
    >
      <ListItemText>
        <Link to={link}>{audience.displayName}</Link>
      </ListItemText>
    </ListItem>
  )
}