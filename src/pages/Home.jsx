// // src/pages/Home.jsx
// import React from "react";

// export default function Home() {
//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-4xl font-bold mb-4">Welcome to MyApp Home Page!</h1>
//       <p className="text-gray-700 mb-6">
//         Ye React + Supabase project ka Home page hai. Navbar upar hamesha visible hai.
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <div className="bg-white p-4 rounded-lg shadow-md">
//           <h2 className="font-semibold text-xl">Feature 1</h2>
//           <p className="text-gray-600">Ye feature 1 ka description hai.</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-md">
//           <h2 className="font-semibold text-xl">Feature 2</h2>
//           <p className="text-gray-600">Ye feature 2 ka description hai.</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-md">
//           <h2 className="font-semibold text-xl">Feature 3</h2>
//           <p className="text-gray-600">Ye feature 3 ka description hai.</p>
//         </div>
//       </div>
//     </div>
//   );
// }







// import ComplaintsForm from "../components/ComplaintsForm";
// import LostFoundForm from "../components/LostFoundForm";
// import VolunteersForm from "../components/VolunteersForm";
// Aage LostFoundForm aur VolunteerForm bhi aise import kar ke add kar sakte ho

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6 space-y-10">
      <h1 className="text-4xl font-bold text-[#0057a8] mb-6">Welcome!</h1>
      <p className="text-gray-600 text-lg">
        Submit your complaints, report lost items, or join volunteer events. We’re here to help you!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

        {/* Complaints Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-2xl transition duration-300">
          <div>
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Submit a Complaint</h2>
            <p className="text-gray-500 mb-4">
              Facing any issues? Submit your complaint and our team will assist you promptly.
            </p>
          </div>
          <Link
            to="/ComplaintsForm"
            className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded shadow-md text-center"
          >
            Submit Complaint
          </Link>
        </div>

        {/* Lost & Found Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-2xl transition duration-300">
          <div>
            <h2 className="text-2xl font-semibold text-green-600 mb-2">Report Lost Item</h2>
            <p className="text-gray-500 mb-4">
              Lost something? Post details of your lost item and let others help you find it.
            </p>
          </div>
          <Link
            to="/LostfoundForm"
            className="mt-auto bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded shadow-md text-center"
          >
            Report Lost Item
          </Link>
        </div>

        {/* Volunteers Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-2xl transition duration-300">
          <div>
            <h2 className="text-2xl font-semibold text-purple-600 mb-2">Join Volunteer Event</h2>
            <p className="text-gray-500 mb-4">
              Want to help the community? Join our volunteer events and make a difference.
            </p>
          </div>
          <Link
            to="/VolunteersForm"
            className="mt-auto bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded shadow-md text-center"
          >
            Join Now
          </Link>
        </div>

      </div>
    </div>
  );
}