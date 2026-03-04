import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './AddBlog/Components/Navbar/Navbar';
import Footer from './AddBlog/Components/Footer/Footer';

import ViewBlog from './AddBlog/ViewBlog';
import BlogDetails from './AddBlog/blogDetails';
import AddBlog from './AddBlog/AddBlog';
import About from './AddBlog/About';
import Login from './AddBlog/Login';
import Signup from './AddBlog/Signup';
import Contact from './AddBlog/Contact';
import LandingPage from './AddBlog/LandingPage';
import AdminLogin from './AddBlog/AdminLogin';
import AdminDashboard from './AddBlog/AdminDashboard';

import AdminRoute from './AddBlog/AdminRoute';
import AdminLayout from './AddBlog/AdminLayout';
import ViewBlogDetails from './AddBlog/ViewBlogDetails';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <Routes>

        {/* ROOT */}
        <Route path="/" element={<><Navbar /><LandingPage /><Footer /></>} />

        <Route path="/home" element={<><Navbar /><LandingPage /><Footer /></>} />
        <Route path="/viewblog" element={<><Navbar /><ViewBlog /><Footer /></>} />
        <Route path="/blog-details" element={<><Navbar /><BlogDetails /><Footer /></>} />
        <Route path="/add-blog" element={<><Navbar /><AddBlog /><Footer /></>} />
        <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
        <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
        <Route path="/signup" element={<><Navbar /><Signup /><Footer /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
        <Route path="/admin-login" element={<><Navbar /><AdminLogin /><Footer /></>} />
        <Route path="/blog/:id" element={<><Navbar /><ViewBlogDetails /><Footer /></>} />

        {/* PROTECTED ADMIN */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  </StrictMode>
);
