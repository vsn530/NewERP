import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Layout from './Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Customers from './pages/Customers';
import CreateOrder from './pages/CreateOrder';
import Orders from './pages/Orders';
import BackendStatus from './BackendStatus';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <BackendStatus />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="customers" element={<Customers />} />
            <Route path="create-order" element={<CreateOrder />} />
            <Route path="orders" element={<Orders />} />
          </Route>
          {/* Legacy redirects */}
          <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
          <Route path="/products" element={<Navigate to="/app/products" replace />} />
          <Route path="/customers" element={<Navigate to="/app/customers" replace />} />
          <Route path="/create-order" element={<Navigate to="/app/create-order" replace />} />
          <Route path="/orders" element={<Navigate to="/app/orders" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
