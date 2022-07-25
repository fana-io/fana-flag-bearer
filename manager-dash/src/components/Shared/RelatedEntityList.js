import { ListItem, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

export const RelatedEntityList = ({ entity, entityName }) => {
  const link = `/${entityName}/` + entity.id;
  return (
    <ListItem divider>
      <ListItemText>
        <RouterLink to={link} >
        <Link underline="hover" component={'span'}>
          {entity.displayName}
        </Link>
          </RouterLink>
      </ListItemText>
    </ListItem>
  );
};
