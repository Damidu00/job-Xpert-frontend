import React from "react";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";


const Companies = () => {
    const navigate = useNavigate();
    return(
        <div>
            <div className='max-w-6xl mx-auto my-18'>
                <div className="flex item-center justify-between ">
                <input 
                    className="w-full max-w-xs"
                    placeholder="Filter by name"

                />
                <button  onClick={() => navigate("/create")} class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-black-700 rounded">
                    New Company
                </button>
                </div>
                <CompaniesTable/>
            </div>
        </div>
    )
}
export default Companies