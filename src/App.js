import './App.css';
import Navbar from './components/navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Map from './components/map';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
          <Routes>
          </Routes>
      </Router>
      <Map/>
    </div>
  );
}

export default App;
