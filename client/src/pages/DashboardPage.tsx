import { useEffect,useState } from "react"

interface Lead{
    _id:string
    name:string
    email:string
    status:string
    source:string
}

const DashboardPage = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [status,setStatus] = useState("New")
    const [source,setSource] = useState("Website")
    const [leads,setLeads] = useState<Lead[]>([])

    const [search,setSearch]=useState("")
    const [filterStatus,setFilterStatus]=useState("")
    const [filterSource,setFilterSource]=useState("")
    const [page,setPage] = useState(1)
    const [totalPages,setTotalPages] = useState(1)
    const [loading,setLoading] =useState(false)
    //createLeads
    const createLead = async ( e:React.FormEvent)=>{
        e.preventDefault()
        try{
            const token =localStorage.getItem("token")
            await fetch("http://localhost:5000/api/leads",{
                    method:"POST",
                    headers:{
                        Authorization:`Bearer ${token}`,
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        name,
                        email,
                        status,
                        source
                    })
                }
            )

            setName("")
            setEmail("")

            fetchLeads()
        }catch(err){
            console.log(err)
        }
    }

    //fetchLeads
    const fetchLeads = async ()=>{
        try{
            setLoading(true)
            const token =localStorage.getItem("token")
            const response = await fetch(
                `http://localhost:5000/api/leads?search=${search}&status=${filterStatus}&source=${filterSource}&page=${page}`,
                {
                    method:"GET",
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )

            const data =await response.json()
            setLeads(data.leads || [])
            setTotalPages(data.pagination.pages)
            setLoading(false)
        }catch(err){
            console.log(err)
        }
    }

    //deleteLead
    const deleteLead=async(id:string)=>{
        try{
            const token = localStorage.getItem("token")
            const response= await fetch(`http://localhost:5000/api/leads/${id}`,{
                    method:"DELETE",
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            fetchLeads()
        }catch(err){
            console.log(err)
        }
    }


    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(!token){ window.location.href = "/"}
        setPage(1)
        },[search,filterSource,filterStatus,page])


    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold mb-8">
                GigFlow Dashboard
            </h1>
            <button
    onClick={()=>{
        localStorage.removeItem("token")
        window.location.href = "/"
    }}
    className="bg-black text-white px-4 py-2 rounded"
>
    Logout
</button>
            <div className="bg-white rounded-xl shadow p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-1">
                    Add New Lead
                </h2>
                <form onSubmit={createLead} className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 font-medium">
                            Name
                        </label>
                        <input type="text" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)}
                            className="w-full border p-3 rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">
                            Email
                        </label>
                        <input type="email" placeholder="Enter email" value={email} onChange={(e)=> setEmail(e.target.value)}
                            className="w-full border p-3 rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">
                            Status
                        </label>
                        <select
                            value={status}
                            onChange={(e)=>
                                setStatus(e.target.value)
                            }
                            className="w-full border p-3 rounded"
                        >
                            <option value="New">
                                New
                            </option>

                            <option value="Contacted">
                                Contacted
                            </option>

                            <option value="Qualified">
                                Qualified
                            </option>

                            <option value="Lost">
                                Lost
                            </option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">
                            Source
                        </label>
                        <select
                            value={source}
                            onChange={(e)=>
                                setSource(e.target.value)
                            }
                            className="w-full border p-3 rounded"
                        >

                            <option value="Website">
                                Website
                            </option>

                            <option value="Instagram">
                                Instagram
                            </option>

                            <option value="Referral">
                                Referral
                            </option>

                        </select>
                    </div>
                    <button
                        className="bg-black text-white p-3 rounded col-span-2 mt-2">
                        Create Lead
                    </button>
                </form>
            </div>




            <h2 className="text-2xl font-semibold mb-4">
                Leads List
            </h2>
            {
                loading && (
                    <p className="mb-4">
                        Loading...
                    </p>
                )
            }
            {
                leads.length === 0 && (

                    <tr>

                        <td
                            colSpan={5}
                            className="text-center p-6"
                        >
                            No leads found
                        </td>

                    </tr>

                )
            }

            <div className="flex gap-4 mb-8">

                <input
                    type="text"
                    placeholder="Search leads..."
                    value={search}
                    onChange={(e)=>
                        setSearch(e.target.value)
                    }
                    className="border p-3 rounded w-[300px]"
                />

                <select
                    value={filterStatus}
                    onChange={(e)=>
                        setFilterStatus(e.target.value)
                    }
                    className="border p-3 rounded"
                >

                    <option value="">
                        All Status
                    </option>

                    <option value="New">
                        New
                    </option>

                    <option value="Contacted">
                        Contacted
                    </option>

                    <option value="Qualified">
                        Qualified
                    </option>

                    <option value="Lost">
                        Lost
                    </option>

                </select>
                <select
                    value={filterSource}
                    onChange={(e)=>
                        setFilterSource(e.target.value)
                    }
                    className="border p-3 rounded"
                >

                    <option value="">
                        All Sources
                    </option>

                    <option value="Website">
                        Website
                    </option>

                    <option value="Instagram">
                        Instagram
                    </option>

                    <option value="Referral">
                        Referral
                    </option>

                </select>

            </div>
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-black text-white">
                        <tr>
                            <th className="p-4 text-left">
                                Name
                            </th>
                            <th className="p-4 text-left">
                                Email
                            </th>
                            <th className="p-4 text-left">
                                Status
                            </th>
                            <th className="p-4 text-left">
                                Source
                            </th>
                            <th className="p-4 text-left">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            leads.map((lead)=>(
                                <tr
                                    key={lead._id}
                                    className="border-b" >
                                    <td className="p-4">
                                        {lead.name}
                                    </td>

                                    <td className="p-4">
                                        {lead.email}
                                    </td>

                                    <td className="p-4">
                                        {lead.status}
                                    </td>

                                    <td className="p-4">
                                        {lead.source}
                                    </td>
                                    <td className="p-4">
                                        <button 
                                        onClick={()=>deleteLead(lead._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="flex gap-4 justify-center mt-6">
                <button
                    onClick={()=>setPage(page - 1)}
                    disabled={page === 1}
                    className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-400">
                    Prev
                </button>



                <span className="font-semibold flex items-center">
                    Page {page} of {totalPages}
                </span>



                <button
                    onClick={()=>
                        setPage(page + 1)
                    }
                    disabled={page === totalPages}
                    className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-400"
                >
                    Next
                </button>

            </div>
        </div>
    )
}

export default DashboardPage