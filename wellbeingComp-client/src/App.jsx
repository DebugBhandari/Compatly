import './App.css';
import Navbar from './Component/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Component/Dashboard';
import Login from './Component/Login';
import Register from './Component/Register';
import MetricsForm from './Component/MetricsForm';
import EditMetrics from './Component/EditMetrics';
import Profile from './Component/Profile';

function App() {
  
  return (
    <div className="app_body">
       <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/metricsForm" element={<MetricsForm/>}/>
      <Route path="/feed" element={<Dashboard/>}/>
      <Route path="/editMetricsForm" element={<EditMetrics/>}/>
      <Route path="/profile" element={<Profile/>}/>
            </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App;
