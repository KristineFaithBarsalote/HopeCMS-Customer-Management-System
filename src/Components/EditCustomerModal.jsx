import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function EditCustomerModal({ isOpen, customerData, onClose, onSuccess }) {
  const [custname, setCustname] = useState("");
  const [address, setAddress] = useState("");
  const [payterm, setPayterm] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (customerData) {
      setCustname(customerData.custname || "");
      setAddress(customerData.address || "");
      setPayterm(customerData.payterm || "COD");
    }
  }, [customerData]);

  if (!isOpen) return null;

  const handleSave = async () => {
    setLoading(true);
    setError("");

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("customer")
      .update({
        custname,
        address,
        payterm,
        stamp: `Edited by ${user?.email} on ${new Date().toISOString()}`
      })
      .eq("custno", customerData.custno);

    if (error) setError("Failed to update customer: " + error.message);
    else {
      onSuccess();
      onClose();
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Edit Customer</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Customer No</label>
            <input
              type="text"
              value={customerData?.custno || ""}
              disabled
              className="w-full border p-2 rounded mt-1 bg-gray-100 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Customer Name</label>
            <input
              type="text"
              value={custname}
              onChange={(e) => setCustname(e.target.value)}
              className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Pay Term</label>
            <select
              value={payterm}
              onChange={(e) => setPayterm(e.target.value)}
              className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="COD">COD</option>
              <option value="30D">30D</option>
              <option value="45D">45D</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}