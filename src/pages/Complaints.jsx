








// import { useState, useEffect } from "react";
// import { supabase } from "../supabaseClient";
// import StatusBadge from "../components/StatusBadge";

// export default function Complaints() {
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [complaints, setComplaints] = useState([]);

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   const fetchComplaints = async () => {
//     const { data: userData } = await supabase.auth.getUser();
//     const { data } = await supabase
//       .from("complaints")
//       .select("*")
//       .eq("user_id", userData.user.id)
//       .order("created_at", { ascending: false });
//     setComplaints(data);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { data: userData } = await supabase.auth.getUser();

//     // Insert complaint
//     await supabase.from("complaints").insert([
//       { user_id: userData.user.id, category, description, status: "submitted" }
//     ]);

//     // Insert notification for admin
//     await supabase.from("notifications").insert([
//       {
//         user_id: userData.user.id,
//         message: `New complaint submitted: ${category}`
//       }
//     ]);

//     setCategory("");
//     setDescription("");
//     fetchComplaints();
//   };

//   return (
//     <div className="p-6 border rounded shadow">
//       <h2 className="text-xl font-bold text-[#0057a8]">Submit Complaint</h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
//         <input
//           placeholder="Category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="border p-2"
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="border p-2"
//         />
//         <button className="bg-[#66b032] text-white py-2 rounded">Submit Complaint</button>
//       </form>

//       {complaints.map((c) => (
//         <div key={c.id} className="border p-3 mt-3 rounded">
//           <h4 className="font-semibold">{c.category}</h4>
//           <p>{c.description}</p>
//           <StatusBadge status={c.status} />
//         </div>
//       ))}
//     </div>
//   );
// }














// import { useState, useEffect } from "react";
// import { supabase } from "../supabaseClient";
// import StatusBadge from "../components/StatusBadge";

// export default function Complaints() {
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [complaints, setComplaints] = useState([]);

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   // Fetch complaints with user info
//   const fetchComplaints = async () => {
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) return;

//     const { data } = await supabase
//       .from("complaints")
//       .select(`
//         *,
//         profiles: user_id (full_name, email)
//       `)
//       .eq("user_id", user.id)
//       .order("created_at", { ascending: false });

//     setComplaints(data || []);
//   };

//   // Submit new complaint
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) return;

//     // Insert complaint
//     await supabase.from("complaints").insert([
//       { user_id: user.id, category, description, status: "submitted" }
//     ]);

//     // Insert notification for admin
//     await supabase.from("notifications").insert([
//       {
//         user_id: user.id,
//         message: `New complaint submitted: ${category}`
//       }
//     ]);

//     setCategory("");
//     setDescription("");
//     fetchComplaints();
//   };

//   return (
//     <div className="p-6 border rounded shadow">
//       <h2 className="text-xl font-bold text-[#0057a8]">Submit Complaint</h2>

//       {/* Complaint Form */}
//       <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
//         <input
//           placeholder="Category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="border p-2"
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="border p-2"
//           required
//         />
//         <button className="bg-[#66b032] text-white py-2 rounded">Submit Complaint</button>
//       </form>

//       {/* Complaints List */}
//       <div className="mt-6 space-y-3">
//         {complaints.map((c) => (
//           <div key={c.id} className="border p-3 rounded">
//             <h4 className="font-semibold">{c.category}</h4>
//             <p>{c.description}</p>

//             {/* User info */}
//             {c.profiles ? (
//               <p className="text-xs text-gray-500">
//                 Submitted by: {c.profiles.full_name} ({c.profiles.email})
//               </p>
//             ) : (
//               <p className="text-xs text-gray-500">Submitted by: Unknown</p>
//             )}

//             <StatusBadge status={c.status} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }