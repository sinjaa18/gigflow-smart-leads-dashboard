import { useEffect,useState } from "react"

interface Lead{

    _id:string
    name:string
    email:string
    status:string
    source:string

}

const DashboardPage = ()=>{

    //form state

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [status,setStatus] = useState("New")
    const [source,setSource] = useState("Website")



    //data state

    const [leads,setLeads] = useState<Lead[]>([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState("")
    const [refreshTrigger,setRefreshTrigger] = useState(0)



    //filter state

    const [search,setSearch] = useState("")
    const [filterStatus,setFilterStatus] = useState("")
    const [filterSource,setFilterSource] = useState("")
    const [sort,setSort] = useState("latest")



    //pagination state

    const [page,setPage] = useState(1)
    const [totalPages,setTotalPages] = useState(1)



    //create lead

    const createLead = async (
        e:React.FormEvent
    )=>{

        e.preventDefault()

        try{

            const token =
                localStorage.getItem("token")

            const response = await fetch(

                `${import.meta.env.VITE_API_URL}/api/leads`,

                {
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

            const data =
                await response.json()

            if(!response.ok){

                setError(data.message)

                return

            }

            setName("")
            setEmail("")
            setStatus("New")
            setSource("Website")

            setSearch("")
            setFilterStatus("")
            setFilterSource("")
            setSort("latest")

            setPage(1)

            setError("")

            setRefreshTrigger((prev)=>
                prev + 1
            )

        }catch(err){

            console.log(err)

        }

    }



    //fetch leads

    const fetchLeads = async ()=>{

        try{

            setLoading(true)

            const token =
                localStorage.getItem("token")

            const response = await fetch(

                `${import.meta.env.VITE_API_URL}/api/leads?search=${search}&status=${filterStatus}&source=${filterSource}&page=${page}&sort=${sort}`,

                {
                    method:"GET",

                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )

            const data =
                await response.json()

            console.log(data.leads)

            if(!response.ok){

                setError(data.message)

                return

            }

            setError("")

            setLeads(data.leads || [])

            setTotalPages(
                data.pagination?.pages || 1
            )

        }catch(err){

            console.log(err)

        }finally{

            setLoading(false)

        }

    }



    //delete lead

    const deleteLead = async (
        id:string
    )=>{

        const confirmDelete =
            window.confirm(
                "Delete this lead?"
            )

        if(!confirmDelete){

            return

        }

        try{

            const token =
                localStorage.getItem("token")

            const response = await fetch(

                `${import.meta.env.VITE_API_URL}/api/leads/${id}`,

                {
                    method:"DELETE",

                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )

            const data =
                await response.json()

            if(!response.ok){

                setError(data.message)

                return

            }

            setError("")

            setRefreshTrigger((prev)=>
                prev + 1
            )

        }catch(err){

            console.log(err)

        }

    }



    //export csv

    const exportCSV = ()=>{

        const headers = [
            "Name",
            "Email",
            "Status",
            "Source"
        ]

        const rows = leads.map((lead)=>([
            lead.name,
            lead.email,
            lead.status,
            lead.source
        ]))

        const csvContent = [

            headers.join(","),

            ...rows.map((row)=>
                row.join(",")
            )

        ].join("\n")

        const blob = new Blob(
            [csvContent],
            {type:"text/csv"}
        )

        const url =
            window.URL.createObjectURL(blob)

        const a =
            document.createElement("a")

        a.href = url

        a.download = "leads.csv"

        a.click()

        window.URL.revokeObjectURL(url)

    }



    //effects

    useEffect(()=>{

        const timer = setTimeout(()=>{

            fetchLeads()

        },500)

        return ()=> clearTimeout(timer)

    },[
        search,
        filterStatus,
        filterSource,
        page,
        sort,
        refreshTrigger
    ])



    return (

        <div className="min-h-screen bg-gray-100 p-6">

            {/* header */}

            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">

                <h1 className="text-4xl font-bold">
                    GigFlow Dashboard
                </h1>

                <div className="flex gap-4">

                    <button

                        onClick={exportCSV}

                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"

                    >
                        Export CSV
                    </button>

                    <button

                        onClick={()=>{
                            localStorage.removeItem("token")
                            window.location.href = "/"
                        }}

                        className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded transition-colors"

                    >
                        Logout
                    </button>

                </div>

            </div>



            {/* error */}

            {
                error && (

                    <div className="bg-red-100 text-red-600 p-3 rounded mb-4">

                        {error}

                    </div>

                )
            }



            {/* create form */}

            <div className="bg-white rounded-xl shadow p-6 mb-8">

                <h2 className="text-2xl font-semibold mb-6">
                    Add New Lead
                </h2>

                <form
                    onSubmit={createLead}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >

                    <div>

                        <label className="block mb-2 font-medium">
                            Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e)=>
                                setName(e.target.value)
                            }
                            className="w-full border p-3 rounded"
                            required
                        />

                    </div>



                    <div>

                        <label className="block mb-2 font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e)=>
                                setEmail(e.target.value)
                            }
                            className="w-full border p-3 rounded"
                            required
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
                        type="submit"
                        className="bg-black text-white p-3 rounded md:col-span-2"
                    >
                        Create Lead
                    </button>

                </form>

            </div>



            {/* filters */}

            <div className="flex flex-wrap gap-4 mb-8">

                <input
                    type="text"
                    placeholder="Search leads..."
                    value={search}
                    onChange={(e)=>
                        setSearch(e.target.value)
                    }
                    className="border p-3 rounded w-full md:w-[300px]"
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



                <select
                    value={sort}
                    onChange={(e)=>
                        setSort(e.target.value)
                    }
                    className="border p-3 rounded"
                >

                    <option value="latest">
                        Latest
                    </option>

                    <option value="oldest">
                        Oldest
                    </option>

                </select>

            </div>



            {/* loading */}

            {
                loading && (

                    <p className="mb-4 text-gray-500">
                        Loading...
                    </p>

                )
            }



            {/* table */}

            <div className="bg-white rounded-xl shadow overflow-x-auto">

                <table className="w-full text-left">

                    <thead className="bg-black text-white">

                        <tr>

                            <th className="p-4">
                                Name
                            </th>

                            <th className="p-4">
                                Email
                            </th>

                            <th className="p-4">
                                Status
                            </th>

                            <th className="p-4">
                                Source
                            </th>

                            <th className="p-4">
                                Actions
                            </th>

                        </tr>

                    </thead>



                    <tbody>

                        {
                            leads.length === 0 && !loading && (

                                <tr>

                                    <td
                                        colSpan={5}
                                        className="text-center p-8 text-gray-500"
                                    >
                                        No leads found
                                    </td>

                                </tr>

                            )
                        }



                        {
                            leads.map((lead)=>(

                                <tr
                                    key={lead._id}
                                    className="border-b hover:bg-gray-50"
                                >

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

                                            onClick={()=>
                                                deleteLead(lead._id)
                                            }

                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"

                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>



            {/* pagination */}

            {
                totalPages > 0 && (

                    <div className="flex gap-4 justify-center mt-6">

                        <button

                            onClick={()=>
                                setPage(page - 1)
                            }

                            disabled={page === 1}

                            className="bg-black text-white px-5 py-2 rounded disabled:bg-gray-300"

                        >
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

                            className="bg-black text-white px-5 py-2 rounded disabled:bg-gray-300"

                        >
                            Next
                        </button>

                    </div>

                )
            }

        </div>

    )

}

export default DashboardPage