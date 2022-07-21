// import './App.css';
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

function App() {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <main>
        <Toolbar />
        <Box sx={{ display: 'flex' }}>
          <Navigation />
          <Route path="/" exact component={FlagsList} />
          <Route path="/flags/:id" component={Flag} />
          <Route path="/audiences/:id" component={Audience} />
          <Route path="/attributes/:id" component={Attribute} />
          <Route path="/flags" exact component={FlagsList} />
          <Route path="/audiences" exact component={AudiencesList} />
          <Route path="/attributes" component={AttributesList} />
          <Route path="/settings" component={Settings} />
        </Box>
      </main>
    </Paper>
  );
}

export default App;