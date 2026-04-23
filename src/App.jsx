import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";


// Components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";


// Pages
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import CustomerDetail from "./pages/CustomerDetail";
import DeletedCustomers from "./pages/DeletedCustomers"; // Added for PR-05
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthCallback from "./pages/AuthCallback";


/**
 * LayoutWrapper handles the visibility of the Sidebar and Navbar.
 * It hides them on Auth-related pages (Login/Register/Callback).
 */
function LayoutWrapper({ children }) {
  const location = useLocation();
 
  // Define pages that should NOT show the sidebar/navbar
  const authPaths = ["/login", "/register", "/auth/callback"];
  const isAuthPage = authPaths.includes(location.pathname);


  if (isAuthPage) {
    return <>{children}</>;
  }


  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar - Navigation */}
      <Sidebar />
     
      <div className="flex-1 flex flex-col">
        {/* Navbar - Top branding and Logout */}
        <Navbar />
       
        {/* Main Content Area */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Routes>
          {/* Dashboard with Stats (PR-01) */}
          <Route path="/" element={<Dashboard />} />
         
          {/* Customer Management (PR-01 & PR-02) */}
          <Route path="/customers" element={<Customers />} />
         
          {/* Customer Detail & Sales Panels (PR-03) */}
          <Route path="/customers/:id" element={<CustomerDetail />} />
         
          {/* Deleted Customers / Recovery (PR-05) */}
          <Route path="/deleted-customers" element={<DeletedCustomers />} />
         
          {/* Read-Only Product Catalogue (PR-04) */}
          <Route path="/products" element={<Products />} />
         
          {/* Sales Placeholder */}
          <Route path="/sales" element={<Sales />} />
         
          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/callback" element={<AuthCallback />} />


          {/* 404 Catch-all */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <h2 className="text-4xl font-bold text-gray-300">404</h2>
              <p className="text-gray-500">Page not found.</p>
            </div>
          } />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}


export default App;

