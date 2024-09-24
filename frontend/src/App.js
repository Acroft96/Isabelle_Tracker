import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./Components/NavBar";
import PurchaseTracker from "./Components/PurchaseTracker/PurchaseTracker";
import TrainingTracker from "./Components/TrainingTracker/TrainingTracker";
import RoomTracker from "./Components/RoomTracker/RoomTracker";
import FileUpload from "./Components/RoomTracker/FileUpload"; 
import AdminPage from "./Components/RoomTracker/OfficeHours/AdminView";  // Import your AdminView or OfficeHours component
import './App.css';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Define your routes */}
        <Route path="/PurchaseTracker" element={<PurchaseTracker />} />
        <Route path="/TrainingTracker" element={<TrainingTracker />} />
        <Route path="/RoomTracker" element={<RoomTracker />} />
        <Route path="/roomtracker/FileUpload" element={<FileUpload />} /> 
        <Route path="/roomtracker/officehours" element={<AdminPage />} /> {/* Add the route for Office Hours */}
        <Route path="/" element={<h1>Welcome</h1>} /> 
      </Routes>
    </Router>
  );
};

export default App;
