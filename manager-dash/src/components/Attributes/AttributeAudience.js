import { ListItem, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

export const AttributeAudience = ({ audience }) => {
  const link = '/audiences/' + audience.id;
  return (
    <ListItem divider>
      <ListItemText>
        <Link underline="hover">
        <RouterLink to={link} >
          {audience.displayName}
          </RouterLink>
        </Link>
      </ListItemText>
    </ListItem>
  );
};
