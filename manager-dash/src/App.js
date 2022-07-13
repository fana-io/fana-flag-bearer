import './App.css';
import { Navigation } from './components/Navigation';
import { FlagsList } from './components/Flags/FlagsList';
import { AudiencesList } from './components/Audiences/AudiencesList';
import { AttributesList } from './components/Attributes/AttributesList';
import { Flag } from './components/Flags/Flag';
import { Audience } from './components/Audiences/Audience';
import { Route } from "react-router-dom";
import { CreateFlagForm } from './components/Flags/CreateFlagForm';
import { CreateAudienceForm } from './components/Audiences/CreateAudienceForm';
import { CreateAttributeForm } from './components/Attributes/CreateAttributeForm';

function App() {
  return (
    <div className="App">
      <h1>FF Dashboard</h1>
      <main>
        <Navigation />
        <Route path="/" exact component={FlagsList} />
        <Route path="/flags/:key" component={Flag} />
        <Route path="/audiences/:key" component={Audience} />
        <Route path="/flags" exact component={FlagsList} />
        <Route path="/audiences" component={AudiencesList} />
        <Route path="/attributes" component={AttributesList} />
        <Route path="/flags/create" component={CreateFlagForm} />
        <Route path="/audiences/create" component={CreateAudienceForm} />
        <Route path="/attributes/create" component={CreateAttributeForm} />
      </main>
    </div>
  );
}

export default App;