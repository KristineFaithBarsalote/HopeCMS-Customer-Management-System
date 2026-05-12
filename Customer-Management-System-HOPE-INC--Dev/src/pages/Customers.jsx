import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomers() {
      setLoading(true);
      const { data } = await supabase.from('customer').select('*').eq('record_status', 'ACTIVE').order('custname');
      setCustomers(data || []);
      setLoading(false);
    }
    fetchCustomers();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Customer Directory</h1>
      <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 text-xs font-bold uppercase text-slate-500">ID</th>
              <th className="p-4 text-xs font-bold uppercase text-slate-500">Customer Name</th>
              <th className="p-4 text-xs font-bold uppercase text-slate-500">Address</th>
              <th className="p-4 text-xs font-bold uppercase text-slate-500">Terms</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? <tr><td colSpan="4" className="p-10 text-center">Loading...</td></tr> : 
              customers.map(c => (
                <tr key={c.custno} className="hover:bg-slate-50">
                  <td className="p-4 text-sm font-mono">{c.custno}</td>
                  <td className="p-4 text-sm font-bold">{c.custname}</td>
                  <td className="p-4 text-sm text-slate-600">{c.address}</td>
                  <td className="p-4 text-sm"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{c.payterm}</span></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}