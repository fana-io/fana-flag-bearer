import './App.css';
import {useMemo} from 'react'
import { Navigation } from './components/Navigation';
import { FlagsList } from './components/Flags/FlagsList';
import { AudiencesList } from './components/Audiences/AudiencesList';
import { AttributesList } from './components/Attributes/AttributesList';
import { Attribute } from './components/Attributes/Attribute';
import { Flag } from './components/Flags/Flag';
import { Audience } from './components/Audiences/Audience';
import { Route } from "react-router-dom";
import { Settings } from './components/Settings';
import Box from '@mui/system/Box';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {red } from '@mui/material/colors'
import useMediaQuery from '@mui/material/useMediaQuery';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(
      () =>
        createTheme({
          palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
            primary: {
              main: red[500]
            },
          },
        }),
      [prefersDarkMode],
    );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme/>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <main>
        <Toolbar />
        <Box sx={{ display: 'flex' }}>
          <Navigation />
          <Box sx={{ marginLeft: 8, maxWidth: 1000 }}>
            <Route path="/" exact component={FlagsList} />
            <Route path="/flags/:id" component={Flag} />
            <Route path="/audiences/:id" component={Audience} />
            <Route path="/attributes/:id" component={Attribute} />
            <Route path="/flags" exact component={FlagsList} />
            <Route path="/audiences" exact component={AudiencesList} />
            <Route path="/attributes" exact component={AttributesList} />
            <Route path="/settings" component={Settings} />
          </Box>
        </Box>
      </main>
    </Paper>
    </ThemeProvider>
  );
}

export default App;