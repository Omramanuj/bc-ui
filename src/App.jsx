// App.jsx
import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PropTypes from "prop-types";
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

function PrivateRoute({ children }) {
  return <SignedIn>{children}</SignedIn>;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function PublicRoute({ children }) {
  return <SignedOut>{children}</SignedOut>;
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function Dashboard() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <UserButton />
      </div>
      {/* Add your dashboard content here */}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<HomePage />} />
        
        {/* Public routes */}
        <Route
          path="/sign-in/*"
          element={
            <PublicRoute>
              <SignInPage />
            </PublicRoute>
          }
        />
        <Route
          path="/sign-up/*"
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          }
        />
        
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;