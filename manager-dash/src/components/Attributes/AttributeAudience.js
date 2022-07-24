import { ListItem, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

export const AttributeAudience = ({ audience }) => {
  const link = '/audiences/' + audience.id;
  return (
    <ListItem divider>
      <ListItemText>
        <RouterLink to={link} >
        <Link underline="hover" component={'span'}>
          {audience.displayName}
        </Link>
          </RouterLink>
      </ListItemText>
    </ListItem>
  );
};
