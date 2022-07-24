import * as React from 'react';
import { Breadcrumbs as MUIBreadcrumbs } from '@mui/material';
import Link from '@mui/material/Link';
import { withRouter } from 'react-router-dom';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const Breadcrumbs = (props) => {
  const {
    history,
    location: { pathname },
    to,
    open
  } = props;
  console.log(`ROUTER PROPS: \n history: ${history}\n to: ${to}\n open: ${open} \n`);
  const pathnames = pathname.split('/').filter((x) => x); // remove empty strings from split
  console.log(pathnames);

  return (
    <div role="presentation" onClick={handleClick}>
      <MUIBreadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          color="inherit"
          href="/"
          onClick={() => history.push('/')}
        >
          Flags
        </Link>
        {pathnames.map((name, index) => {
          return (
            <Link
              underline="hover"
              color="inherit"
              onClick={() => history.push('/')}
            >
              {name}
            </Link>
          );
        })}
        {/* <Link
          underline="hover"
          color="text.primary"
          href="/material-ui/react-breadcrumbs/"
          aria-current="page"
        >
          Breadcrumbs
        </Link> */}
      </MUIBreadcrumbs>
    </div>
  );
};
export default withRouter(Breadcrumbs);
