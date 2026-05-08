import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

import AdminDashboard from "./pages/dashboard/AdminDashboard";
import ReceptionDashboard from "./pages/dashboard/ReceptionDashboard";

import PrivateRoute from "./components/PrivateRoute";

import Clients from "./pages/clients/Clients";
import Chambres from "./pages/chambres/Chambres";
import Reservations from "./pages/reservations/Reservations";
import Users from "./pages/users/Users";
import ChangePassword from "./pages/ChangePassword";
import ClientDashboard from "./pages/dashboard/ClientDashboard";
import ClientLogin from "./pages/ClientLogin";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        {/* ADMIN */}
        <Route
          path="/dashboard/admin"
          element={
            <PrivateRoute roleRequired="ADMIN">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* RECEPTION */}
        <Route
          path="/dashboard/reception"
          element={
            <PrivateRoute roleRequired="RECEPTIONNISTE">
              <ReceptionDashboard />
            </PrivateRoute>
          }
        />

        {/* CLIENTS */}
        <Route
          path="/dashboard/clients"
          element={
            <PrivateRoute roleRequired="RECEPTIONNISTE">
              <Clients />
            </PrivateRoute>
          }
        />

        {/* CHAMBRES */}
        <Route
          path="/dashboard/chambres"
          element={
            <PrivateRoute roleRequired="RECEPTIONNISTE">
              <Chambres />
            </PrivateRoute>
          }
        />

        {/* RESERVATIONS TEMPORAIRE */}
        <Route
          path="/dashboard/reservations"
          element={
            <PrivateRoute roleRequired="RECEPTIONNISTE">
              <Reservations />
            </PrivateRoute>
          }
        />

        {/* USERS */}
        
        <Route
  path="/dashboard/users"
  element={<Users />}
/>
<Route
  path="/change-password"
  element={<ChangePassword />}
/>
<Route
  path="/client"
  element={<ClientDashboard />}
/>
<Route
  path="/client-login"
  element={<ClientLogin />}
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;