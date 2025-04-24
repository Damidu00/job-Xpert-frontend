//  import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "@mui/material";
// import toast from "react-hot-toast";

// const UserDetails = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem("access_token");
//         if (!token) {
//           console.error("Access token not found in localStorage.");
//           return;
//         }
//         const response = await axios.get("http://localhost:5000/api/users/getAllUsers", {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         });
//         setUsers(response.data);
//       } catch (error) {
//         console.error("Error fetching users:", error.response?.data?.message || error.message);
//         alert("Failed to fetch users. Please check your connection or login again.");
//       }
//     };
//     fetchUsers();
//   }, []);

// //  { Delete a user by ID}


// const handleDeleteUser = async (userId) => {
//   if (!window.confirm("Are you sure you want to delete this user?")) return;
 

//   try {
//     const token = localStorage.getItem("access_token");
//     await axios.delete(`http://localhost:5000/api/users/delete/${userId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//       withCredentials: true,
//     });

//     setUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
//     toast.success("User deleted successfully");
//   } catch (error) {
//     console.error("Error deleting user:", error.response?.data?.message || error.message);
//     toast.error("Error deleting user. Check console for details.");
//   }
// };

  

//   return (
//     <div
//       className="min-h-screen p-6"
//       style={{
//         backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA25hVk1y2o2qy1XJeZB7Bsq7Y6tUvj3kIRQ&s')`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
//         <h1 className="text-center text-2xl font-bold text-blue-600 py-6">USER LIST</h1>
//         <table className="w-full text-left border-collapse">
//           <thead className="bg-gray-200 border-separate">
//             <tr>
//               <th className="px-4 py-2 text-black font-semibold">Full Name</th>
//               <th className="px-4 py-2 text-black font-semibold">Email</th>
//               <th className="px-4 py-2 text-black font-semibold">Role</th>
//               <th className="px-4 py-2 text-black font-semibold">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length > 0 ? (
//               users.map((user) => (
//                 <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
//                   <td className="px-4 py-3 text-gray-700">{user.fullname}</td>
//                   <td className="px-4 py-3 text-gray-700">{user.email}</td>
//                   <td className="px-4 py-3 text-gray-700">{user.role}</td>
//                   <td className="px-4 py-3">
//                     <Button variant="contained" color="error" onClick={() => handleDeleteUser(user._id)}>
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="text-center py-4 text-gray-500">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserDetails;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Correct import for autoTable

const UserDetails = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          console.error("Access token not found in localStorage.");
          return;
        }
        const response = await axios.get("http://localhost:5000/api/users/getAllUsers", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error.response?.data?.message || error.message);
        alert("Failed to fetch users. Please check your connection or login again.");
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://localhost:5000/api/users/delete/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error.response?.data?.message || error.message);
      toast.error("Error deleting user. Check console for details.");
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("User List", 14, 10);
  
    // Check if autoTable is available
    if (typeof doc.autoTable !== "function") {
      console.error("❌ autoTable is not available! Make sure jspdf-autotable is properly imported.");
      return;
    }
  
    const tableColumn = ["Full Name", "Email", "Role"];
    const tableRows = users.map(user => [user.fullname, user.email, user.role]);
  
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20
    });
  
    doc.save("user_list.pdf");
  };
  
  return (
    <div className="min-h-screen p-6" style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA25hVk1y2o2qy1XJeZB7Bsq7Y6tUvj3kIRQ&s')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden relative p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-blue-600">USER LIST</h1>
          <Button variant="contained" color="primary" onClick={downloadPDF}>
            Download PDF
          </Button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200 border-separate">
            <tr>
              <th className="px-4 py-2 text-black font-semibold">Full Name</th>
              <th className="px-4 py-2 text-black font-semibold">Email</th>
              <th className="px-4 py-2 text-black font-semibold">Role</th>
              <th className="px-4 py-2 text-black font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">{user.fullname}</td>
                  <td className="px-4 py-3 text-gray-700">{user.email}</td>
                  <td className="px-4 py-3 text-gray-700">{user.role}</td>
                  <td className="px-4 py-3">
                    <Button variant="contained" color="error" onClick={() => handleDeleteUser(user._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetails;
