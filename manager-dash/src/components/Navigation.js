import ListItemButton from "@mui/material/ListItemButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List"
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import FlagIcon from "@mui/icons-material/Flag";
import GroupsIcon from "@mui/icons-material/Groups";
import AttributionIcon from "@mui/icons-material/Attribution";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom"
import Toolbar from "@mui/material/Toolbar";

export const Navigation = () => {
  const drawerWidth = 200;
  const pages = [
    { name: 'Flags', url: '/flags', icon: <FlagIcon />}, 
    { name: 'Audiences', url: '/audiences', icon: <GroupsIcon />}, 
    { name: 'Attributes', url: '/attributes', icon: <AttributionIcon />}, 
    { name: 'Settings', url: '/settings', icon: <SettingsIcon />}
  ];

  return (
    <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar/>
        <List>
          {pages.map(page => {
            return (
              <Link key={page.name} to={page.url}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {page.icon}
                    </ListItemIcon>
                    <ListItemText primary={page.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            )
          })}
        </List>
      </Drawer>
  )
}