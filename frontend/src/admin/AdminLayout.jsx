import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import AdminDashboard from "./AdminDashboard/AdminDashboard";

function AdminLayout() {
  return (
    <>
      <Navbar />
      <AdminDashboard />
      <Footer />
    </>
  );
}

export default AdminLayout;