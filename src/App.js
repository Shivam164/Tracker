import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Home from './Components/Home';
import Connection from './Components/Connection';
import Use from './Components/Use';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route exact path = "/" element={<Home />}/>
          <Route path = "/connection" element={<Connection />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
