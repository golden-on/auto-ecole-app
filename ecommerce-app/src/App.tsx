import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import RouteContainer from './routes';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <RouteContainer/>
      </div>
    </BrowserRouter>

  );
}

export default App;
