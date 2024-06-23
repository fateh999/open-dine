import LoginPage from './pages/login-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductsPage from './pages/products-page';
import ForgotPasswordPage from './pages/forgot-password-page';
import DashboardNavigationLayout from './modules/dashboard/components/dashboard-navigation-layout';
import CustomersPage from './pages/customers-page';
import StaffsPage from './pages/staffs-page';
import OrdersPage from './pages/orders-page';
import DashboardPage from './pages/dashboard-page';
import ProtectedRoute from './components/shared/protected-route';
import AuthRoute from './components/shared/auth-route';
import useAuthStateChanged from './modules/auth/hooks/use-auth-state-changed';

function App() {
  useAuthStateChanged();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardNavigationLayout />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<DashboardPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="staffs" element={<StaffsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="analytics" element={<ProductsPage />} />
        </Route>
        <Route
          path="/login"
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <AuthRoute>
              <ForgotPasswordPage />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
