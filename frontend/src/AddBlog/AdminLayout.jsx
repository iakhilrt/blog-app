import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import AdminDashboard from "./AdminDashboard";

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
