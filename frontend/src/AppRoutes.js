import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import FoodPage from "./pages/Food/FoodPage";
import CartPage from "./pages/Cart/CartPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Payment from "./pages/Payment/Payment";
import OrdersPage from "./pages/Orders/OrdersPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import FoodsAdminPage from "./pages/FoodsAdmin/FoodsAdminPage";
import FoodEditPage from "./pages/FoodEdit/FoodEditPage";
import UsersPage from "./pages/UsersPage/UsersPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search/:searchTerm" element={<HomePage />} />
      <Route path="/tag/:tag" element={<HomePage />} />
      <Route path="/food/:id" element={<FoodPage />} />
      <Route path="/Cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/checkout"
        element={
          <AuthRoute>
            <CheckoutPage />
          </AuthRoute>
        }
      />

      <Route
        path="/payment"
        element={
          <AuthRoute>
            <Payment />
          </AuthRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <AuthRoute>
            <ProfilePage />
          </AuthRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <AuthRoute>
            <OrdersPage />
          </AuthRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <AuthRoute>
            <Dashboard />
          </AuthRoute>
        }
      />

      <Route
        path="/admin/foods/:searchTerm?"
        element={
          <AdminRoute>
            <FoodsAdminPage />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/addFood"
        element={
          <AdminRoute>
            <FoodEditPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/editFood/:foodId"
        element={
          <AdminRoute>
            <FoodEditPage />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/users/:searchTerm?"
        element={
          <AdminRoute>
            <UsersPage />
          </AdminRoute>
        }
      />
    </Routes>
  );
}
