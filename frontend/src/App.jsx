import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Pages
import LandingPage from "./pages/LandingPage/LandingPage";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import AddBlog from "./pages/AddBlog/AddBlog";
import ViewBlog from "./pages/ViewBlog/ViewBlog";
import ViewBlogDetails from "./pages/ViewBlogDetails/ViewBlogDetails";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";

// Admin
import AdminLogin from "./admin/AdminLogin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminRoute from "./admin/AdminRoute";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

// Layout wrapper
function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect root to home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Public pages */}
        <Route path="/home" element={
          <MainLayout><LandingPage /></MainLayout>
        } />
        <Route path="/signup" element={
          <MainLayout><Signup /></MainLayout>
        } />
        <Route path="/login" element={
          <MainLayout><Login /></MainLayout>
        } />
        <Route path="/about" element={
          <MainLayout><About /></MainLayout>
        } />
        <Route path="/contact" element={
          <MainLayout><Contact /></MainLayout>
        } />

        {/* Public blog viewing */}
        <Route path="/viewblog" element={
          <MainLayout><ViewBlog /></MainLayout>
        } />
        <Route path="/blog/:id" element={
          <MainLayout><ViewBlogDetails /></MainLayout>
        } />

        {/* 🔒 Protected — login required */}
        <Route path="/add-blog" element={
          <ProtectedRoute>
            <MainLayout><AddBlog /></MainLayout>
          </ProtectedRoute>
        } />

        {/* Admin pages */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        } />

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/home" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;