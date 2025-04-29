import React from "react";
import googleLogo from '../../assets/google.png';


const CompaniesTable = () => {
    return (
        <div
            class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl mt-10">
            <table class="w-full text-left table-auto min-w-max ">
                <thead>
                    <tr>
                        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                Logo
                            </p>
                        </th>
                        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                Name
                            </p>
                        </th>
                        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                Date
                            </p>
                        </th>
                        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                Action
                            </p>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="hover:bg-slate-50">
                        <td class="p-4 border-b border-slate-200">
                            <img src={googleLogo} alt="Company Logo" class="w-10 h-10 rounded-full object-cover"/>
                        </td>

                        <td class="p-4 border-b border-slate-200">
                            <p class="block text-sm text-slate-800">
                                John Michael
                            </p>
                        </td>

                        <td class="p-4">
                            <p class="block text-sm text-slate-800">
                                04/10/21
                            </p>
                        </td>
                        <div class="flex space-x-2">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 border border-black-700 rounded">
                                Edit
                            </button>
                            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-2 border border-black-700 rounded">
                                Delete
                            </button>
                        </div>

                    </tr>


                </tbody>
            </table>
            <p class="text-center text-gray-600 text-sm mt-4">
                A list of your recent registered companies
            </p>
        </div>
    )
}
export default CompaniesTable