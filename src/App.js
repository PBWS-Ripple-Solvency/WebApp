import './App.css';
import {BrowserRouter as Router} from "react-router-dom"; 
import Navbar from './utils/Navbar';
import AppRoutes from "./components/Routes.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
