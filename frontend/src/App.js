import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import NavBar from "./Components/NavBar";
import PurchaseTracker from "./Components/PurchaseTracker/PurchaseTracker";
import TrainingTracker from "./Components/TrainingTracker/TrainingTracker";
import RoomTracker from "./Components/RoomTracker/RoomTracker";
import './App.css';

const App = () => {

  return (
    <Router> 
      <div>
        <NavBar /> 
        <Routes>
          <Route path="/PurchaseTracker" element={<PurchaseTracker />} />
          <Route path="/TrainingTracker" element={<TrainingTracker />} />
          <Route path="/RoomTracker" element={<RoomTracker />} />
          <Route path="/" element={<h1>Welcome</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
