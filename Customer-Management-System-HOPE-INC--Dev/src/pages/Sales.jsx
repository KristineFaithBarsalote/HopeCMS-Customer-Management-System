export default function Sales() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Sales Transactions</h1>
        <p className="text-sm text-gray-500">View all company sales records and transaction history.</p>
      </div>


      {/* Sales Table Skeleton */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-600 text-sm">Trans No</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Customer</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Date</th>
              <th className="p-4 font-semibold text-gray-600 text-sm text-right">Total Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Mock Data for handover */}
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="p-4 text-sm font-mono text-blue-600">TRX-9901</td>
              <td className="p-4 text-sm text-gray-800 font-medium">Example Corp</td>
              <td className="p-4 text-sm text-gray-600">2026-04-21</td>
              <td className="p-4 text-sm text-gray-900 font-bold text-right">₱125,000.00</td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="p-4 text-sm font-mono text-blue-600">TRX-9902</td>
              <td className="p-4 text-sm text-gray-800 font-medium">Hope Allied Services</td>
              <td className="p-4 text-sm text-gray-600">2026-04-20</td>
              <td className="p-4 text-sm text-gray-900 font-bold text-right">₱45,200.00</td>
            </tr>
          </tbody>
        </table>
      </div>


      {/* Quick Summary Note */}
      <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        <p className="text-gray-400 italic">
          Additional filters (Date Range, Employee Filter) will be added in Sprint 3.
        </p>
      </div>
    </div>
  );
}

