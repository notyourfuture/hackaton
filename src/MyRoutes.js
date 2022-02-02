import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminProvider from "./contexts/AdminProvider";
import ClientProvider from "./contexts/ClientProvider";
import AddProduct from "./pages/AddProduct";
import AdminPanel from "./pages/AdminPanel";
import HomePage from "./pages/HomePage";
import MyNavbar from "./components/MyNavbar";
import AuthProvider from "./contexts/AuthProvider";
import ProCart from "./pages/ProCart";
import Details from "./pages/Details";
import MyCreditCard from "./components/MyCreditCard";

const MyRoutes = () => {
  return (
    <AuthProvider>
      <AdminProvider>
        <ClientProvider>
          <BrowserRouter>
            <MyNavbar />
            <Routes>
              <Route path="/add" element={<AddProduct />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<ProCart />} />
              <Route path="/buy" element={<MyCreditCard />} />
              <Route path="/product/:id" element={<Details />} />
            </Routes>
          </BrowserRouter>
        </ClientProvider>
      </AdminProvider>
    </AuthProvider>
  );
};

export default MyRoutes;
