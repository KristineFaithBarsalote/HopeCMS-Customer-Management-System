export default function Dashboard() {
  const stats = [
    { label: "Total Customers", value: "128", color: "bg-blue-500" },
    { label: "Active Products", value: "45", color: "bg-green-500" },
    { label: "Total Sales (MTD)", value: "₱450,200", color: "bg-purple-500" },
  ];


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">HOPE INC. Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here is what's happening today.</p>
      </div>


      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 ${stat.color} rounded-lg opacity-20`}></div>
          </div>
        ))}
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity Feed */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4">Recent Sales</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center border-b pb-3 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800">Transaction #TRX-00{i}</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <p className="text-sm font-bold text-gray-900">₱12,500.00</p>
              </div>
            ))}
          </div>
        </div>


        {/* System Status / Shortcuts */}
        <div className="bg-slate-800 p-6 rounded-xl shadow-sm text-white">
          <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 text-sm transition">Add Sale</button>
            <button className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 text-sm transition">Generate Report</button>
            <button className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 text-sm transition">Inventory Check</button>
            <button className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 text-sm transition">Support Ticket</button>
          </div>
        </div>
      </div>
    </div>
  );
}

