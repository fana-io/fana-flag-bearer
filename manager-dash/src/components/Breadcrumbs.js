import * as React from 'react';
import { Breadcrumbs as MUIBreadcrumbs, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { withRouter } from 'react-router-dom';

// function handleClick(event) {
//   event.preventDefault();
//   console.info('You clicked a breadcrumb.');
// }

const Breadcrumbs = (props) => {
  const {
    history,
    location: { pathname },
  } = props;
  const pathnames = pathname.split('/').filter((x) => x); // remove empty strings from split
  console.log(pathnames);

  return (
    <div role="presentation">
      <MUIBreadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          color="inherit"
          href="/"
          onClick={() => history.push('/')}
        >
          Home
        </Link>
        {pathnames.map((name, index) => {
          const routeTo = `${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const casedName = name[0].toUpperCase() + name.slice(1)

          return isLast ? (
            <Typography> {casedName}</Typography>
          ) : (
            <Link
              underline="hover"
              color="inherit"
              onClick={() => history.push(routeTo)}
            >
              {casedName}
            </Link>
          );
        })}
      </MUIBreadcrumbs>
    </div>
  );
};
export default withRouter(Breadcrumbs);
