export default function Products() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Product Catalogue</h1>
        <p className="text-sm text-gray-500">View current items and pricing. This list is read-only.</p>
      </div>


      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-600 text-sm">Product Code</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Description</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Unit</th>
              <th className="p-4 font-semibold text-gray-600 text-sm text-right">Current Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Example Row - Data will eventually come from the 'product' table */}
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="p-4 text-sm font-mono text-blue-600">PROD-001</td>
              <td className="p-4 text-sm text-gray-800 font-medium">Industrial Air Filter (Large)</td>
              <td className="p-4 text-sm text-gray-600">PCS</td>
              <td className="p-4 text-sm text-gray-900 font-bold text-right">₱1,250.00</td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="p-4 text-sm font-mono text-blue-600">PROD-002</td>
              <td className="p-4 text-sm text-gray-800 font-medium">Heavy Duty Compressor Oil</td>
              <td className="p-4 text-sm text-gray-600">LIT</td>
              <td className="p-4 text-sm text-gray-900 font-bold text-right">₱850.00</td>
            </tr>
          </tbody>
        </table>
      </div>


      {/* Note for the team */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Pricing shown is based on the latest entries in the <strong>priceHist</strong> table.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

