import './App.css';
import { Navigation } from './components/Navigation';
import { FlagsList } from './components/FlagsList';
import { AudiencesList } from './components/AudiencesList';
import { AttributesList } from './components/AttributesList';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>FF Dashboard</h1>
      <main>
        <Navigation />
        <Routes>
          <Route path="/" element={<FlagsList />} />
        <Route path="/audiences" element={<AudiencesList />} />
        <Route path="/attributes" element={<AttributesList />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;