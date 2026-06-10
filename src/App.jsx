import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './components/Navbar/Navbar'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'

import DashboardHome from "./pages/Dashboard/DashbordHome";
import DashboardProducts from "./pages/Dashboard/DashboardProducts";
import DashboardOrders from "./pages/Dashboard/DashboardOrders";
import DashboardProfile from "./pages/Dashboard/DashboardProfile";

import PublicNotFound from "./pages/NotFound/PublicNotFound"
import DashboardNotFound from "./pages//NotFound/DashboardNotFound"
import AuthNotFound from './pages/NotFound/AuthNotFound'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      {/* <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes> */}

      <Routes>
        {/* Layout principal */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<PublicNotFound />} />

        </Route>

        {/* Authentification */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Navigate to="login" />} />
          <Route path="login" element={<Login auth={setIsAuthenticated}/>} />
          <Route path="*" element={<AuthNotFound />} />
        </Route>

        {/* DASHBOARD */}
        {/* <Route element={<DashboardLayout />}>

          <Route
            path="/dashboard"
            element={<DashboardHome />}
          />

          <Route
            path="/dashboard/products"
            element={<DashboardProducts />}
          />

          <Route
            path="/dashboard/orders"
            element={<DashboardOrders />}
          />

          <Route
            path="/dashboard/profile"
            element={<DashboardProfile />}
          />

        </Route> */}

        {/* <Route path="/dashboard" element={<DashboardLayout />}> */}
        <Route path="/dashboard"
          element={
            <ProtectedRoute 
            isAuthenticated={isAuthenticated}
            >
              <DashboardLayout />
            </ProtectedRoute>
          }>

          <Route
            index
            element={<DashboardHome />}
          />

          <Route
            path="products"
            element={<DashboardProducts />}
          />

          <Route
            path="orders"
            element={<DashboardOrders />}
          />

          <Route
            path="profile"
            element={<DashboardProfile />}
          />

          <Route
            path="*"
            element={<DashboardNotFound />}
          />

        </Route>
      </Routes>

    </>
  )
}

export default App;