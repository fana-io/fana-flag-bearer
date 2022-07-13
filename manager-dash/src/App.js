import './App.css';
import { Navigation } from './components/Navigation';
import { FlagsList } from './components/FlagsList';
import { AudiencesList } from './components/Audiences/AudiencesList';
import { AttributesList } from './components/Attributes/AttributesList';
import { Flag } from './components/Flag';
import { Audience } from './components/Audiences/Audience';
import { Route, Routes } from "react-router-dom";
import { CreateFlagForm } from './components/Flags/CreateFlagForm';
import { CreateAudienceForm } from './components/Audiences/CreateAudienceForm';
import { CreateAttributeForm } from './components/Attributes/CreateAttributeForm';

function App() {
  return (
    <div className="App">
      <h1>FF Dashboard</h1>
      <main>
        <Navigation />
        <Routes>
          <Route path="/flags/:key" element={<Flag />} />
          <Route path="/audiences/:key" element={<Audience />} />
          <Route path="/" element={<FlagsList />} />
          <Route path="/flags" element={<FlagsList />} />
          <Route path="/audiences" element={<AudiencesList />} />
          <Route path="/attributes" element={<AttributesList />} />
          <Route path="/flags/create" element={<CreateFlagForm />} />
          <Route path="/audiences/create" element={<CreateAudienceForm />} />
          <Route path="/attributes/create" element={<CreateAttributeForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;