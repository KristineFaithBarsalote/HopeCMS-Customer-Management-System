import { useState } from "react";
import AddCustomerModal from "../components/AddCustomerModal";
import EditCustomerModal from "../components/EditCustomerModal";


export default function Customers() {
  // Modal Visibility States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);


  // State to track which customer is being edited or deleted
  const [selectedCustomer, setSelectedCustomer] = useState(null);


  // Mock User Role (In Sprint 2, this will come from your AuthContext)
  // Options: 'USER', 'ADMIN', 'SUPERADMIN'
  const currentUser = { user_type: 'ADMIN' };


  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setIsEditOpen(true);
  };


  const handleDelete = (customer) => {
    setSelectedCustomer(customer);
    setIsDeleteOpen(true);
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          + Add Customer
        </button>
      </div>


      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">ID</th>
              <th className="p-4 font-semibold text-gray-600">Customer Name</th>
              <th className="p-4 font-semibold text-gray-600">Address</th>
              <th className="p-4 font-semibold text-gray-600">Pay Term</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
             
              {/* Stamp column gated for ADMIN/SUPERADMIN only  */}
              {(currentUser.user_type === 'ADMIN' || currentUser.user_type === 'SUPERADMIN') && (
                <th className="p-4 font-semibold text-gray-600">Stamp</th>
              )}
             
              <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr className="hover:bg-gray-50">
              <td className="p-4 text-sm font-mono text-gray-500">C0001</td>
              <td className="p-4 font-medium text-gray-900">Example Corp</td>
              <td className="p-4 text-sm text-gray-600">123 Manila St.</td>
              <td className="p-4 text-sm">30D</td>
              <td className="p-4 text-xs font-bold text-green-600">ACTIVE</td>
             
              {/* Stamp data gated  */}
              {(currentUser.user_type === 'ADMIN' || currentUser.user_type === 'SUPERADMIN') && (
                <td className="p-4 text-xs text-gray-400">2025-04-21 17:20</td>
              )}


              <td className="p-4 text-right space-x-3">
                <button
                  onClick={() => handleEdit({ custno: 'C0001', custname: 'Example Corp', address: '123 Manila St.', payterm: '30D' })}
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete({ custno: 'C0001', custname: 'Example Corp' })}
                  className="text-red-600 hover:underline text-sm font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>


      {/* Modals for PR-02  */}
      <AddCustomerModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      />
     
      <EditCustomerModal
        isOpen={isEditOpen}
        customerData={selectedCustomer}
        onClose={() => setIsEditOpen(false)}
      />


      <DeleteConfirmDialog
        isOpen={isDeleteOpen}
        customerName={selectedCustomer?.custname}
        onClose={() => setIsDeleteOpen(false)}
      />
    </div>
  );
}

