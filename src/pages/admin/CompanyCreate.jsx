import React from "react";
import { useNavigate } from "react-router-dom";


//create company register page...

const CompanyCreate = () => {
    const navigate = useNavigate();

    const registerNewCompany = async () =>{
        try {
            const res = await axios.post()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className="max-w-4xl mx-auto">
                <div className="my-10">
                <h1 className="front-bold text-2xl"> Your Company name</h1>
                <p className="text-gray-500"> What would you like to give your company name? you can change this later.</p>
                </div>
                <label>Comapany Name </label>
                <input
                type="text" 
                class="bg-white my-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                placeholder="JobXpert" 
                required 
                />
                <div className="flex item-center gap-2 my-10">
                    <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-black-700 rounded" onClick={() => navigate("/company")}>Cancle</button>
                    <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-black-700 rounded" onClick={registerNewCompany}>Continue</button>

                </div>
                

            </div>
        </div>
    )
}
export default CompanyCreate