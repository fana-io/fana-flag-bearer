import * as React from 'react';
import {Breadcrumbs as MUIBreadcrumbs } from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { withRouter } from 'react-router-dom';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const Breadcrumbs = (props) => {
  console.log(props, 'from router')
  return (
    <div role="presentation" onClick={handleClick}>
      <MUIBreadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          href="/material-ui/react-breadcrumbs/"
          aria-current="page"
        >
          Breadcrumbs
        </Link>
      </MUIBreadcrumbs>
    </div>
  );
}
export default withRouter(Breadcrumbs);