import './App.css';
import Navbar from './components/navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
          <Routes>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
