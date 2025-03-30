//  import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "@mui/material";

// const UserDetails = () => {
//   const [users, setUsers] = useState([]);

//   // Fetch all users on component mount
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem("access_token");
//         console.log("Fetching users..."); // Debugging log
//         const response = await axios.get("http://localhost:5000/api/users/getAllUsers", {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         });
//         console.log("Fetched users:", response.data); // Debugging log
//         setUsers(response.data);
//       } catch (error) {
//         console.error("Error fetching users:", error.response?.data?.message || error.message);
//       }
//     };
//     fetchUsers();
//   }, []);

//   // Delete a user by ID
//   const handleDeleteUser = async (userId) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       const token = localStorage.getItem("access_token");
//       await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });
//       // Remove the deleted user from the state
//       setUsers(users.filter(user => user._id !== userId));
//     } catch (error) {
//       console.error("Error deleting user:", error.response?.data?.message || error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
//         <h1 className="text-center text-2xl font-bold mb-6">USER LIST</h1>
//         <table className="w-full text-left border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border border-gray-300 px-4 py-2">Full Name</th>
//               <th className="border border-gray-300 px-4 py-2">Email</th>
//               <th className="border border-gray-300 px-4 py-2">Role</th>
//               <th className="border border-gray-300 px-4 py-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length > 0 ? (
//               users.map((user) => (
//                 <tr key={user._id} className="border border-gray-300">
//                   <td className="border border-gray-300 px-4 py-2">{user.fullname}</td>
//                   <td className="border border-gray-300 px-4 py-2">{user.email}</td>
//                   <td className="border border-gray-300 px-4 py-2">{user.role}</td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     <Button
//                       variant="contained"
//                       color="error"
//                       onClick={() => handleDeleteUser(user._id)}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="text-center py-4">No users found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserDetails;

//  Delete a user by ID
//   const handleDeleteAccount = async () => {
//     if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem('access_token');
//       await axios.delete('http://localhost:5000/api/users/delete', {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });

//       localStorage.removeItem('access_token');
//       window.location.href = '/userDetails';
//     } catch (error) {
//       console.error('Error deleting account:', error.response?.data?.message || error.message);
//     }
//   };




  // Delete a user by ID
  // const handleDeleteAccount = async (userId) => {
  //   if (!window.confirm("Are you sure you want to delete this account? This action cannot be undone.")) {
  //     return;
  //   }
  
  //   try {
  //     const token = localStorage.getItem("access_token");
  //     if (!token) {
  //       alert("Authorization token is missing. Please log in again.");
  //       return;
  //     }
  
  //     // Corrected API endpoint (backend should have "/delete/:id" route)
  //     const response = await axios.delete(`http://localhost:5000/api/users/delete/${userId}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //       withCredentials: true,
  //     });
  
  //     if (response.status === 200) {
  //       // Update state to remove deleted user without page reload
  //       setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  //     } else {
  //       alert("Failed to delete user. Try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting account:", error.response?.data?.message || error.message);
  //     alert("Error deleting user. Check console for details.");
  //   }
  // };



  import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

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

  const handleDeleteAccount = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://localhost:5000/api/users/delete/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error("Error deleting account:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA25hVk1y2o2qy1XJeZB7Bsq7Y6tUvj3kIRQ&s')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <h1 className="text-center text-2xl font-bold text-blue-600 py-6">USER LIST</h1>
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
                    <Button variant="contained" color="error" onClick={() => handleDeleteAccount(user._id)}>
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
