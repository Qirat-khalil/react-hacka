// import { useEffect, useState } from "react";
// import { supabase } from "../supabaseClient";

// export default function Navbar() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     async function fetchUser() {
//       const { data } = await supabase.auth.getUser();
//       setUser(data.user);
//     }
//     fetchUser();
//   }, []);

//   const handleLogout = async () => {
//     const { error } = await supabase.auth.signOut();
//     if (!error) {
//       window.location.href = "/"; // Redirect to login/signup page
//     }
//   };

//   return (
//     <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
//       <h1 className="text-xl font-bold text-blue-600">MyApp</h1>

//       <div className="flex space-x-6">
//         <a href="#" className="text-gray-600 hover:text-blue-600 transition">Home</a>
//         <a href="#" className="text-gray-600 hover:text-blue-600 transition">About</a>
//         <a href="#" className="text-gray-600 hover:text-blue-600 transition">Product</a>
//         <a href="#" className="text-gray-600 hover:text-blue-600 transition">Shop</a>
//       </div>

//       {user && (
//         <div className="flex items-center space-x-3 relative group">
//           {/* <img
//             src={user.user_metadata?.profile_url || "https://via.placeholder.com/40"}
//             alt="profile"
//             className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer"
//           /> */}
//           <span className="font-medium text-gray-700">{user.user_metadata?.name}</span>

//           <div className="absolute right-0 top-12 w-40 bg-white shadow-lg rounded-lg hidden group-hover:block">
//             <button
//               onClick={handleLogout}
//               className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

























import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      window.location.href = "/"; // redirect to login/signup
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">MyApp</h1>

      <div className="flex space-x-6">
        <Link to="/" className="text-gray-600 hover:text-blue-600 transition">Home</Link>
        <Link to="/ComplaintsForm" className="text-gray-600 hover:text-blue-600 transition">Complaints</Link>
        <Link to="/LostfoundForm" className="text-gray-600 hover:text-blue-600 transition">Lost & Found</Link>
        <Link to="/VolunteersForm" className="text-gray-600 hover:text-blue-600 transition">Volunteers</Link>
      </div>

      {user && (
        <div className="flex items-center space-x-3 relative group">
          {/* <span className="font-medium text-gray-700">{user.user_metadata?.name || "User"}</span> */}

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-500 bg-red-200 hover:bg-gray-100"
            >
              Logout
            </button>
          <div className="absolute right-0 top-12 w-40 bg-white shadow-lg rounded-lg ">
          </div>
        </div>
      )}
    </nav>
  );
}

