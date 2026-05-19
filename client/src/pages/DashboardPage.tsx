import { useEffect, useState } from "react";

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
}

const DashboardPage = () => {
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("New");
  const [source, setSource] = useState("Website");

  // Data State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  // Filter State
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSource, setFilterSource] = useState("");

  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //Handlers

  const createLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, status, source }),
      });

      setName("");
      setEmail("");
      fetchLeads();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/leads?search=${search}&status=${filterStatus}&source=${filterSource}&page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setLeads(data.leads || []);
      setTotalPages(data.pagination.pages);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const deleteLead = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/leads/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchLeads();
    } catch (err) {
      console.log(err);
    }
  };

  // Side effect

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    }
    fetchLeads();
  }, [search, filterSource, filterStatus, page]);

  useEffect(() => {
    setPage(1);
  }, [search, filterStatus, filterSource]);

  //Render

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">GigFlow Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="bg-black text-white px-4 py-2 rounded h-fit hover:bg-gray-800 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Add Lead Form */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Add New Lead</h2>
        <form onSubmit={createLead} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Source</label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="Website">Website</option>
              <option value="Instagram">Instagram</option>
              <option value="Referral">Referral</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-black text-white p-3 w-full md:w-2/3 md:mx-auto rounded md:col-span-2 mt-4 hover:bg-gray-800 transition-colors"
          >
            Create Lead
          </button>
        </form>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded w-full md:w-[300px] focus:outline-none focus:ring-2 focus:ring-black"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </select>

        <select
          value={filterSource}
          onChange={(e) => setFilterSource(e.target.value)}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">All Sources</option>
          <option value="Website">Website</option>
          <option value="Instagram">Instagram</option>
          <option value="Referral">Referral</option>
        </select>
      </div>

      {/* Leads Table */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Leads List</h2>
        {loading && <p className="text-gray-500 font-medium animate-pulse">Loading...</p>}
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Source</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && !loading && (
              <tr>
                <td colSpan={5} className="text-center p-8 text-gray-500">
                  No leads found
                </td>
              </tr>
            )}

            {leads.map((lead) => (
              <tr key={lead._id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-4">{lead.name}</td>
                <td className="p-4 text-gray-600">{lead.email}</td>
                <td className="p-4">
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {lead.status}
                  </span>
                </td>
                <td className="p-4">{lead.source}</td>
                <td className="p-4">
                  <button
                    onClick={() => deleteLead(lead._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex gap-4 justify-center mt-8">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="bg-black text-white px-5 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
          >
            Prev
          </button>

          <span className="font-semibold flex items-center text-gray-700">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="bg-black text-white px-5 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;