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

// Layout wrapper — pages with Navbar + Footer
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

        {/* Public pages — with Navbar & Footer */}
        <Route path="/home" element={
          <MainLayout><LandingPage /></MainLayout>
        } />
        <Route path="/signup" element={
          <MainLayout><Signup /></MainLayout>
        } />
        <Route path="/login" element={
          <MainLayout><Login /></MainLayout>
        } />
        <Route path="/viewblog" element={
          <MainLayout><ViewBlog /></MainLayout>
        } />
        <Route path="/blog/:id" element={
          <MainLayout><ViewBlogDetails /></MainLayout>
        } />
        <Route path="/add-blog" element={
          <MainLayout><AddBlog /></MainLayout>
        } />
        <Route path="/contact" element={
          <MainLayout><Contact /></MainLayout>
        } />
        <Route path="/about" element={
          <MainLayout><About /></MainLayout>
        } />

        {/* Admin pages — no Navbar/Footer on login */}
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