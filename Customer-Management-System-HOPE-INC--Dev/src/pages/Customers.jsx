import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import AddCustomerModal from "../Components/AddCustomerModal";
import EditCustomerModal from "../Components/EditCustomerModal";
import DeleteConfirmDialog from "../Components/DeleteConfirmDialog";
import Toast from "../Components/Toast";
import SkeletonRow from "../Components/SkeletonRow";

export default function Customers() {
  const [userType, setUserType] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  const isAdmin = userType === "ADMIN" || userType === "SUPERADMIN";
  const isSuperAdmin = userType === "SUPERADMIN";

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    setLoading(true);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setLoading(false); return; }

    const { data: userRow } = await supabase
      .from("user")
      .select("user_type")
      .eq("id", session.user.id)
      .single();

    const type = userRow?.user_type;
    setUserType(type);

    let query = supabase.from("customer").select("*").order("custno");
    if (type === "USER") query = query.eq("record_status", "ACTIVE");

    const { data, error } = await query;
    if (error) setToast({ message: "Failed to load customers.", type: "error" });
    else setCustomers(data || []);
    setLoading(false);
  }

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setIsEditOpen(true);
  };

  const handleDelete = (customer) => {
    setSelectedCustomer(customer);
    setIsDeleteOpen(true);
  };

  const confirmSoftDelete = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("customer")
      .update({
        record_status: "INACTIVE",
        stamp: `Soft-deleted by ${user?.email} on ${new Date().toISOString()}`
      })
      .eq("custno", selectedCustomer.custno);

    if (error) setToast({ message: "Failed to delete customer.", type: "error" });
    else {
      setToast({ message: "Customer deleted successfully.", type: "success" });
      setIsDeleteOpen(false);
      fetchCustomers();
    }
  };

  const filtered = customers.filter(c =>
    c.custname?.toLowerCase().includes(search.toLowerCase()) ||
    c.payterm?.toLowerCase().includes(search.