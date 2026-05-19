import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";

import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import CustomerDetail from "./pages/CustomerDetail";
import DeletedCustomers from "./pages/DeletedCustomers";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthCallback from "./pages/AuthCallBack";
import UserManagement from "./pages/UserManagement";
import CustomerSalesSummaryPage from "./pages/CustomerSalesSummaryPage";
import ProductRevenuePage from "./pages/ProductRevenuePage";

function LayoutWrapper({ children, session }) {
  const location = useLocation();
  const authPaths = ["/login", "/register", "/auth/callback"];
  const isAuthPage = authPaths.includes(location.pathname);

  if (isAuthPage) return <>{children}</>;

  // Redirect to login if no session
  if (!session) return <Navigate to="/login" replace />;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}

function App() {
  const [session, setSession] = useState(undefined);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) loadUserType(session.user.id);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (session) loadUserType(session.user.id);
      else setUserType(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function loadUserType(userId) {
    const { data } = await supabase
      .from("user")
      .select("user_type")
      .eq("id", userId)
      .single();
    setUserType(data?.user_type ?? null);
  }

  // Show nothing while session is loading
  if (session === undefined) return (
    <div className="flex items-center justify-center h-screen text-gray-400">
      Loading...
    </div>
  );

  return (
    <BrowserRouter>
      <LayoutWrapper session={session}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="/deleted-customers" element={
            userType === "USER"
              ? <Navigate to="/customers" />
              : <DeletedCustomers />
          } />
          <Route path="/products" element={<Products />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/reports/customer-sales" element={<CustomerSalesSummaryPage />} />
          <Route path="/reports/product-revenue" element={<ProductRevenuePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
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