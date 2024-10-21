import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard'
import Sendmoney from "./pages/Sendmoney";
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
      <ToastContainer />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sendmoney" element={<Sendmoney />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
