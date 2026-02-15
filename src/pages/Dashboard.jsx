// import { useEffect, useState } from "react";
// import { supabase } from "../supabaseClient";
// import { Link } from "react-router-dom";

// export default function Dashboard() {

//   const [stats, setStats] = useState({
//     complaints: 0,
//     pending: 0,
//     lost: 0,
//     volunteers: 0
//   });

//   const [recentComplaints, setRecentComplaints] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {

//     const { data:userData } = await supabase.auth.getUser();
//     const userId = userData.user.id;

//     // Complaints Count
//     const { data:complaints } = await supabase
//       .from("complaints")
//       .select("*")
//       .eq("user_id", userId);

//     const { data:pending } = await supabase
//       .from("complaints")
//       .select("*")
//       .eq("user_id", userId)
//       .eq("status","submitted");

//     // Lost Items
//     const { data:lost } = await supabase
//       .from("lost_found_items")
//       .select("*")
//       .eq("user_id", userId);

//     // Volunteers
//     const { data:volunteers } = await supabase
//       .from("volunteers")
//       .select("*")
//       .eq("user_id", userId);

//     // Recent Complaints
//     const { data:recent } = await supabase
//       .from("complaints")
//       .select("*")
//       .eq("user_id", userId)
//       .order("created_at",{ascending:false})
//       .limit(3);

//     setStats({
//       complaints: complaints?.length || 0,
//       pending: pending?.length || 0,
//       lost: lost?.length || 0,
//       volunteers: volunteers?.length || 0
//     });

//     setRecentComplaints(recent || []);
//   };

//   return (
//     <div className="p-6">

//       <h2 className="text-2xl font-bold text-[#0057a8] mb-6">
//         Dashboard Overview
//       </h2>

//       {/* Stats Cards */}
//       <div className="grid md:grid-cols-4 gap-4">

//         <div className="bg-white shadow p-5 rounded border-l-4 border-blue-500">
//           <h4 className="text-gray-500">Total Complaints</h4>
//           <p className="text-2xl font-bold">{stats.complaints}</p>
//         </div>

//         <div className="bg-white shadow p-5 rounded border-l-4 border-yellow-500">
//           <h4 className="text-gray-500">Pending Complaints</h4>
//           <p className="text-2xl font-bold">{stats.pending}</p>
//         </div>

//         <div className="bg-white shadow p-5 rounded border-l-4 border-red-500">
//           <h4 className="text-gray-500">Lost Items</h4>
//           <p className="text-2xl font-bold">{stats.lost}</p>
//         </div>

//         <div className="bg-white shadow p-5 rounded border-l-4 border-green-500">
//           <h4 className="text-gray-500">Volunteer Events</h4>
//           <p className="text-2xl font-bold">{stats.volunteers}</p>
//         </div>

//       </div>

//       {/* Quick Actions */}
//       <div className="mt-8">
//         <h3 className="text-xl font-semibold text-[#0057a8] mb-3">
//           Quick Actions
//         </h3>

//         <div className="flex gap-4 flex-wrap">
//           <Link to="/complaints"
//             className="bg-[#0057a8] text-white px-4 py-2 rounded">
//             New Complaint
//           </Link>

//           <Link to="/lostfound"
//             className="bg-[#66b032] text-white px-4 py-2 rounded">
//             Post Lost Item
//           </Link>

//           <Link to="/volunteer"
//             className="bg-purple-600 text-white px-4 py-2 rounded">
//             Volunteer Now
//           </Link>
//         </div>
//       </div>

//       {/* Recent Activity */}
//       <div className="mt-10">
//         <h3 className="text-xl font-semibold text-[#0057a8] mb-3">
//           Recent Complaints
//         </h3>

//         {recentComplaints.length === 0 && (
//           <p className="text-gray-500">No recent activity</p>
//         )}

//         {recentComplaints.map(c => (
//           <div key={c.id} className="border p-3 mt-3 rounded shadow-sm">
//             <h4 className="font-semibold">{c.category}</h4>
//             <p className="text-sm text-gray-600">{c.description}</p>
//             <span className="text-xs text-gray-500">
//               Status: {c.status}
//             </span>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }











// import { useEffect, useState } from "react";
// import { supabase } from "../supabaseClient";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     complaints: 0,
//     pending: 0,
//     lost: 0,
//     volunteers: 0,
//   });

//   const [recentComplaints, setRecentComplaints] = useState([]);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       // ✅ Logged-in user
//       const { data: { user }, error: userError } = await supabase.auth.getUser();
//       if (userError) throw userError;
//       if (!user) return;

//       // ✅ Get role from profiles
//       const { data: profile } = await supabase
//         .from("profiles")
//         .select("role")
//         .eq("id", user.id)
//         .single();

//       const admin = profile?.role === "admin";
//       setIsAdmin(admin);

//       // Queries
//       let complaintsQuery = supabase.from("complaints").select("*");
//       let pendingQuery = supabase.from("complaints").select("*").eq("status", "submitted");
//       let lostQuery = supabase.from("lost_found_items").select("*");
//       let volunteersQuery = supabase.from("volunteers").select("*");

//       if (!admin) {
//         complaintsQuery = complaintsQuery.eq("user_id", user.id);
//         pendingQuery = pendingQuery.eq("user_id", user.id);
//         lostQuery = lostQuery.eq("user_id", user.id);
//         volunteersQuery = volunteersQuery.eq("user_id", user.id);
//       }

//       const { data: complaints } = await complaintsQuery;
//       const { data: pending } = await pendingQuery;
//       const { data: lost } = await lostQuery;
//       const { data: volunteers } = await volunteersQuery;

//       const { data: recent } = await complaintsQuery
//         .order("created_at", { ascending: false })
//         .limit(3);

//       setStats({
//         complaints: complaints?.length || 0,
//         pending: pending?.length || 0,
//         lost: lost?.length || 0,
//         volunteers: volunteers?.length || 0,
//       });

//       setRecentComplaints(recent || []);

//     } catch (err) {
//       console.log("Dashboard fetch error:", err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold text-[#0057a8] mb-6">Dashboard Overview</h2>

//       {/* Stats Cards */}
//       <div className="grid md:grid-cols-4 gap-4">
//         <div className="bg-white shadow p-5 rounded border-l-4 border-blue-500">
//           <h4 className="text-gray-500">Total Complaints</h4>
//           <p className="text-2xl font-bold">{stats.complaints}</p>
//         </div>
//         <div className="bg-white shadow p-5 rounded border-l-4 border-yellow-500">
//           <h4 className="text-gray-500">Pending Complaints</h4>
//           <p className="text-2xl font-bold">{stats.pending}</p>
//         </div>
//         <div className="bg-white shadow p-5 rounded border-l-4 border-red-500">
//           <h4 className="text-gray-500">Lost Items</h4>
//           <p className="text-2xl font-bold">{stats.lost}</p>
//         </div>
//         <div className="bg-white shadow p-5 rounded border-l-4 border-green-500">
//           <h4 className="text-gray-500">Volunteer Events</h4>
//           <p className="text-2xl font-bold">{stats.volunteers}</p>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="mt-8">
//         <h3 className="text-xl font-semibold text-[#0057a8] mb-3">Quick Actions</h3>
//         <div className="flex gap-4 flex-wrap">
//           <Link to="/complaints" className="bg-[#0057a8] text-white px-4 py-2 rounded">New Complaint</Link>
//           <Link to="/lostfound" className="bg-[#66b032] text-white px-4 py-2 rounded">Post Lost Item</Link>
//           <Link to="/volunteer" className="bg-purple-600 text-white px-4 py-2 rounded">Volunteer Now</Link>
//         </div>
//       </div>

//       {/* Recent Complaints */}
//       <div className="mt-10">
//         <h3 className="text-xl font-semibold text-[#0057a8] mb-3">Recent Complaints</h3>
//         {recentComplaints.length === 0 ? (
//           <p className="text-gray-500">No recent activity</p>
//         ) : (
//           recentComplaints.map(c => (
//             <div key={c.id} className="border p-3 mt-3 rounded shadow-sm flex justify-between items-center">
//               <div>
//                 <h4 className="font-semibold">{c.category}</h4>
//                 <p className="text-sm text-gray-600">{c.description}</p>
//                 <span className="text-xs text-gray-500">Status: {c.status}</span>
//               </div>
//               {isAdmin && (
//                 <div className="flex gap-2">
//                   <button
//                     className="bg-yellow-500 text-white px-2 py-1 rounded"
//                     onClick={async () => {
//                       const newStatus = c.status === "submitted" ? "resolved" : "submitted";
//                       await supabase.from("complaints").update({ status: newStatus }).eq("id", c.id);
//                       fetchData();
//                     }}
//                   >
//                     Toggle Status
//                   </button>
//                   <button
//                     className="bg-red-500 text-white px-2 py-1 rounded"
//                     onClick={async () => {
//                       if (confirm("Are you sure to delete this complaint?")) {
//                         await supabase.from("complaints").delete().eq("id", c.id);
//                         fetchData();
//                       }
//                     }}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }




















// import { useEffect, useState } from "react";
// import { supabase } from "../supabaseClient";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     complaints: 0,
//     pending: 0,
//     lost: 0,
//     volunteers: 0,
//   });

//   const [recentComplaints, setRecentComplaints] = useState([]);
//   const [lostItems, setLostItems] = useState([]);
//   const [volunteers, setVolunteers] = useState([]);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       // Logged-in user
//       const { data: { user }, error: userError } = await supabase.auth.getUser();
//       if (userError) throw userError;
//       if (!user) return;

//       // Role
//       const { data: profile } = await supabase
//         .from("profiles")
//         .select("role, full_name, email")
//         .eq("id", user.id)
//         .single();
//       const admin = profile?.role === "admin";
//       setIsAdmin(admin);

//       // ===== Queries =====
//       let complaintsQuery = supabase.from("complaints").select("*, profiles(full_name,email)");
//       let pendingQuery = supabase.from("complaints").select("*, profiles(full_name,email)").eq("status", "submitted");
//       let lostQuery = supabase.from("lost_found_items").select("*, profiles(full_name,email)");
//       let volunteersQuery = supabase.from("volunteers").select("*, profiles(full_name,email)");

//       if (!admin) {
//         complaintsQuery = complaintsQuery.eq("user_id", user.id);
//         pendingQuery = pendingQuery.eq("user_id", user.id);
//         lostQuery = lostQuery.eq("user_id", user.id);
//         volunteersQuery = volunteersQuery.eq("user_id", user.id);
//       }

//       const { data: complaints } = await complaintsQuery;
//       const { data: pending } = await pendingQuery;
//       const { data: lost } = await lostQuery;
//       const { data: volunteers } = await volunteersQuery;

//       const { data: recent } = await complaintsQuery.order("created_at", { ascending: false }).limit(3);

//       setStats({
//         complaints: complaints?.length || 0,
//         pending: pending?.length || 0,
//         lost: lost?.length || 0,
//         volunteers: volunteers?.length || 0,
//       });

//       setRecentComplaints(recent || []);
//       setLostItems(lost || []);
//       setVolunteers(volunteers || []);

//     } catch (err) {
//       console.log("Dashboard fetch error:", err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold text-[#0057a8] mb-6">Dashboard Overview</h2>

//       {/* Stats Cards */}
//       <div className="grid md:grid-cols-4 gap-4">
//         <div className="bg-white shadow p-5 rounded border-l-4 border-blue-500">
//           <h4 className="text-gray-500">Total Complaints</h4>
//           <p className="text-2xl font-bold">{stats.complaints}</p>
//         </div>
//         <div className="bg-white shadow p-5 rounded border-l-4 border-yellow-500">
//           <h4 className="text-gray-500">Pending Complaints</h4>
//           <p className="text-2xl font-bold">{stats.pending}</p>
//         </div>
//         <div className="bg-white shadow p-5 rounded border-l-4 border-red-500">
//           <h4 className="text-gray-500">Lost Items</h4>
//           <p className="text-2xl font-bold">{stats.lost}</p>
//         </div>
//         <div className="bg-white shadow p-5 rounded border-l-4 border-green-500">
//           <h4 className="text-gray-500">Volunteer Events</h4>
//           <p className="text-2xl font-bold">{stats.volunteers}</p>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="mt-8">
//         <h3 className="text-xl font-semibold text-[#0057a8] mb-3">Quick Actions</h3>
//         <div className="flex gap-4 flex-wrap">
//           <Link to="/complaints" className="bg-[#0057a8] text-white px-4 py-2 rounded">New Complaint</Link>
//           <Link to="/lostfound" className="bg-[#66b032] text-white px-4 py-2 rounded">Post Lost Item</Link>
//           <Link to="/volunteer" className="bg-purple-600 text-white px-4 py-2 rounded">Volunteer Now</Link>
//         </div>
//       </div>

//       {/* Recent Complaints */}
//       <div className="mt-10">
//         <h3 className="text-xl font-semibold text-[#0057a8] mb-3">Recent Complaints</h3>
//         {recentComplaints.length === 0 ? (
//           <p className="text-gray-500">No recent activity</p>
//         ) : (
//           recentComplaints.map(c => (
//             <div key={c.id} className="border p-3 mt-3 rounded shadow-sm flex justify-between items-center">
//               <div>
//                 <h4 className="font-semibold">{c.category}</h4>
//                 <p className="text-sm text-gray-600">{c.description}</p>
//                 <span className="text-xs text-gray-500">
//                   Status: {c.status} | User: {c.profiles?.full_name} ({c.profiles?.email})
//                 </span>
//               </div>
//               {isAdmin && (
//                 <div className="flex gap-2">
//                   <button
//                     className="bg-yellow-500 text-white px-2 py-1 rounded"
//                     onClick={async () => {
//                       const newStatus = c.status === "submitted" ? "resolved" : "submitted";
//                       await supabase.from("complaints").update({ status: newStatus }).eq("id", c.id);
//                       fetchData();
//                     }}
//                   >
//                     Toggle Status
//                   </button>
//                   <button
//                     className="bg-red-500 text-white px-2 py-1 rounded"
//                     onClick={async () => {
//                       if (confirm("Are you sure to delete this complaint?")) {
//                         await supabase.from("complaints").delete().eq("id", c.id);
//                         fetchData();
//                       }
//                     }}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>

//       {/* Lost Items */}
//       <div className="mt-10">
//         <h3 className="text-xl font-semibold text-[#66b032] mb-3">Lost Items</h3>
//         {lostItems.length === 0 ? (
//           <p className="text-gray-500">No lost items</p>
//         ) : (
//           lostItems.map(l => (
//             <div key={l.id} className="border p-3 mt-3 rounded shadow-sm flex justify-between items-center">
//               <div>
//                 <h4 className="font-semibold">{l.item_name}</h4>
//                 <p className="text-sm text-gray-600">{l.description}</p>
//                 <span className="text-xs text-gray-500">
//                   User: {l.profiles?.full_name} ({l.profiles?.email})
//                 </span>
//               </div>
//               {isAdmin && (
//                 <button
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                   onClick={async () => {
//                     if (confirm("Delete this lost item?")) {
//                       await supabase.from("lost_found_items").delete().eq("id", l.id);
//                       fetchData();
//                     }
//                   }}
//                 >
//                   Delete
//                 </button>
//               )}
//             </div>
//           ))
//         )}
//       </div>

//       {/* Volunteers */}
//       <div className="mt-10">
//         <h3 className="text-xl font-semibold text-[#800080] mb-3">Volunteer Events</h3>
//         {volunteers.length === 0 ? (
//           <p className="text-gray-500">No volunteers yet</p>
//         ) : (
//           volunteers.map(v => (
//             <div key={v.id} className="border p-3 mt-3 rounded shadow-sm flex justify-between items-center">
//               <div>
//                 <h4 className="font-semibold">{v.event_name}</h4>
//                 <p className="text-sm text-gray-600">{v.description}</p>
//                 <span className="text-xs text-gray-500">
//                   User: {v.profiles?.full_name} ({v.profiles?.email})
//                 </span>
//               </div>
//               {isAdmin && (
//                 <button
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                   onClick={async () => {
//                     if (confirm("Delete this volunteer entry?")) {
//                       await supabase.from("volunteers").delete().eq("id", v.id);
//                       fetchData();
//                     }
//                   }}
//                 >
//                   Delete
//                 </button>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }




















// import { useEffect, useState } from "react";
// import { supabase } from "../supabaseClient";

// export default function Dashboard() {
//   const [stats, setStats] = useState({ complaints: 0, pending: 0, lost: 0, volunteers: 0 });
//   const [recentComplaints, setRecentComplaints] = useState([]);
//   const [lostItems, setLostItems] = useState([]);
//   const [volunteers, setVolunteers] = useState([]);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => { fetchData(); }, []);

//   const fetchData = async () => {
//     try {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) return;

//       const { data: profile } = await supabase
//         .from("profiles")
//         .select("role")
//         .eq("id", user.id)
//         .single();

//       const admin = profile?.role === "admin";
//       setIsAdmin(admin);

//       // Fetch data with profiles info
//       let complaintsQuery = supabase.from("complaints").select("*, profiles(full_name,email)");
//       let lostQuery = supabase.from("lost_found_items").select("*, profiles(full_name,email)");
//       let volunteersQuery = supabase.from("volunteers").select("*, profiles(full_name,email)");

//       if (!admin) {
//         complaintsQuery = complaintsQuery.eq("user_id", user.id);
//         lostQuery = lostQuery.eq("user_id", user.id);
//         volunteersQuery = volunteersQuery.eq("user_id", user.id);
//       }

//       const { data: complaints } = await complaintsQuery;
//       const { data: lost } = await lostQuery;
//       const { data: volunteers } = await volunteersQuery;

//       const { data: recent } = await complaintsQuery.order("created_at", { ascending: false }).limit(3);

//       setStats({
//         complaints: complaints?.length || 0,
//         pending: complaints?.filter(c => c.status === "submitted").length || 0,
//         lost: lost?.length || 0,
//         volunteers: volunteers?.length || 0
//       });

//       setRecentComplaints(recent || []);
//       setLostItems(lost || []);
//       setVolunteers(volunteers || []);
//     } catch (err) {
//       console.error("Dashboard fetch error:", err);
//     }
//   };

//   return (
//     <div className="p-6 space-y-10">
//       <h2 className="text-3xl font-bold text-[#0057a8]">Dashboard Overview</h2>

//       {/* Stats Cards */}
//       <div className="grid md:grid-cols-4 gap-6">
//         <StatCard title="Total Complaints" value={stats.complaints} color="blue" />
//         <StatCard title="Pending Complaints" value={stats.pending} color="yellow" />
//         <StatCard title="Lost Items" value={stats.lost} color="red" />
//         <StatCard title="Volunteer Events" value={stats.volunteers} color="green" />
//       </div>

//       {/* Quick Actions */}
//       <div className="flex gap-4 flex-wrap">
//         <ActionButton text="New Complaint" color="blue" />
//         <ActionButton text="Post Lost Item" color="green" />
//         <ActionButton text="Volunteer Now" color="purple" />
//       </div>

//       {/* Sections */}
//       <Section title="Recent Complaints" items={recentComplaints} isAdmin={isAdmin} fetchData={fetchData} type="complaint" />
//       <Section title="Lost Items" items={lostItems} isAdmin={isAdmin} fetchData={fetchData} type="lost" />
//       <Section title="Volunteer Events" items={volunteers} isAdmin={isAdmin} fetchData={fetchData} type="volunteer" />
//     </div>
//   );
// }

// // ---------------------- Components ----------------------

// // Stat Card Component
// function StatCard({ title, value, color }) {
//   const colors = {
//     blue: "border-blue-500",
//     yellow: "border-yellow-500",
//     red: "border-red-500",
//     green: "border-green-500"
//   };
//   return (
//     <div className={`bg-white shadow-lg p-5 rounded border-l-4 ${colors[color]}`}>
//       <h4 className="text-gray-500">{title}</h4>
//       <p className="text-2xl font-bold">{value}</p>
//     </div>
//   );
// }

// // Action Button Component
// function ActionButton({ text, color }) {
//   const bg = {
//     blue: "bg-[#0057a8] hover:bg-blue-700",
//     green: "bg-[#66b032] hover:bg-green-700",
//     purple: "bg-purple-600 hover:bg-purple-800"
//   };
//   // Admin ke liye sirf modal/open form ka kaam karenge (redirect nahi)
//   return (
//     <button className={`${bg[color]} text-white px-5 py-2 rounded shadow-md`}>
//       {text}
//     </button>
//   );
// }

// // Section Component
// function Section({ title, items, isAdmin, fetchData, type }) {
//   if (items.length === 0) return (
//     <div className="mt-8">
//       <h3 className="text-xl font-semibold text-[#0057a8] mb-3">{title}</h3>
//       <p className="text-gray-500">No {title.toLowerCase()}</p>
//     </div>
//   );

//   return (
//     <div className="mt-8">
//       <h3 className="text-xl font-semibold text-[#0057a8] mb-3">{title}</h3>
//       <div className="space-y-3">
//         {items.map(item => (
//           <div key={item.id} className="border p-4 rounded shadow-md flex justify-between items-center">
//             <div>
//               <h4 className="font-semibold">{item.category || item.item_name || item.event_name}</h4>
//               <p className="text-sm text-gray-700">{item.description}</p>

//               {/* ✅ User name & email show */}
//               {item.profiles ? (
//                 <p className="text-xs text-gray-500">
//                   Submitted by:  ({item.profiles.email})
//                 </p>
//               ) : (
//                 <p className="text-xs text-gray-500">Submitted by: Unknown</p>
//               )}

//               {item.status && (
//                 <span className="text-xs text-gray-500">Status: {item.status}</span>
//               )}
//             </div>

//             {/* Admin buttons */}
//             {isAdmin && (
//               <div className="flex gap-2">
//                 {type === "complaint" && (
//                   <button
//                     className="bg-yellow-500 text-white px-2 py-1 rounded"
//                     onClick={async () => {
//                       const newStatus = item.status === "submitted" ? "resolved" : "submitted";
//                       await supabase.from("complaints").update({ status: newStatus }).eq("id", item.id);
//                       fetchData();
//                     }}
//                   >
//                     Toggle Status
//                   </button>
//                 )}
//                 <button
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                   onClick={async () => {
//                     const tableMap = { complaint: "complaints", lost: "lost_found_items", volunteer: "volunteers" };
//                     if (confirm(`Delete this ${title}?`)) {
//                       await supabase.from(tableMap[type]).delete().eq("id", item.id);
//                       fetchData();
//                     }
//                   }}
//                 >
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }











// import { useEffect, useState } from "react";
// import { supabase } from "../supabaseClient";

// export default function Dashboard() {
//   const [stats, setStats] = useState({ complaints: 0, pending: 0, lost: 0, volunteers: 0 });
//   const [recentComplaints, setRecentComplaints] = useState([]);
//   const [lostItems, setLostItems] = useState([]);
//   const [volunteers, setVolunteers] = useState([]);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => { fetchData(); }, []);

//   const fetchData = async () => {
//     try {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) return;

//       const { data: profile } = await supabase
//         .from("profiles")
//         .select("role")
//         .eq("id", user.id)
//         .single();

//       const admin = profile?.role === "admin";
//       setIsAdmin(admin);

//       // ----------------
//       // Total complaints globally
//       const { data: allComplaints } = await supabase.from("complaints").select("*");

//       // Fetch data with profiles info (user-specific or admin)
//       let complaintsQuery = supabase
//         .from("complaints")
//         .select(`*, profiles:user_id(full_name,email)`);

//       let lostQuery = supabase
//         .from("lost_found_items")
//         .select(`*, profiles:user_id(full_name,email)`);

//       let volunteersQuery = supabase
//         .from("volunteers")
//         .select(`*, profiles:user_id(full_name,email)`);

//       if (!admin) {
//         complaintsQuery = complaintsQuery.eq("user_id", user.id);
//         lostQuery = lostQuery.eq("user_id", user.id);
//         volunteersQuery = volunteersQuery.eq("user_id", user.id);
//       }

//       const { data: complaints } = await complaintsQuery;
//       const { data: lost } = await lostQuery;
//       const { data: volunteers } = await volunteersQuery;

//       const { data: recent } = await complaintsQuery.order("created_at", { ascending: false }).limit(3);

//       // ----------------
//       // Stats
//       setStats({
//         complaints: allComplaints?.length || 0, // ✅ Total global complaints
//         pending: admin
//           ? allComplaints?.filter(c => c.status === "submitted").length || 0 // admin sees all pending
//           : complaints?.filter(c => c.status === "submitted").length || 0,  // normal user sees own pending
//         lost: lost?.length || 0,
//         volunteers: volunteers?.length || 0
//       });

//       setRecentComplaints(recent || []);
//       setLostItems(lost || []);
//       setVolunteers(volunteers || []);
//     } catch (err) {
//       console.error("Dashboard fetch error:", err);
//     }
//   };

//   return (
//     <div className="p-6 space-y-10">
//       <h2 className="text-3xl font-bold text-[#0057a8]">Dashboard Overview</h2>

//       {/* Stats Cards */}
//       <div className="grid md:grid-cols-4 gap-6">
//         <StatCard title="Total Complaints" value={stats.complaints} color="blue" />
//         <StatCard title="Pending Complaints" value={stats.pending} color="yellow" />
//         <StatCard title="Lost Items" value={stats.lost} color="red" />
//         <StatCard title="Volunteer Events" value={stats.volunteers} color="green" />
//       </div>

//       {/* Quick Actions */}
//       <div className="flex gap-4 flex-wrap">
//         <ActionButton text="New Complaint" color="blue" />
//         <ActionButton text="Post Lost Item" color="green" />
//         <ActionButton text="Volunteer Now" color="purple" />
//       </div>

//       {/* Sections */}
//       <Section title="Recent Complaints" items={recentComplaints} isAdmin={isAdmin} fetchData={fetchData} type="complaint" />
//       <Section title="Lost Items" items={lostItems} isAdmin={isAdmin} fetchData={fetchData} type="lost" />
//       <Section title="Volunteer Events" items={volunteers} isAdmin={isAdmin} fetchData={fetchData} type="volunteer" />
//     </div>
//   );
// }

// // ---------------------- Components ----------------------

// function StatCard({ title, value, color }) {
//   const colors = {
//     blue: "border-blue-500",
//     yellow: "border-yellow-500",
//     red: "border-red-500",
//     green: "border-green-500"
//   };
//   return (
//     <div className={`bg-white shadow-lg p-5 rounded border-l-4 ${colors[color]}`}>
//       <h4 className="text-gray-500">{title}</h4>
//       <p className="text-2xl font-bold">{value}</p>
//     </div>
//   );
// }

// function ActionButton({ text, color }) {
//   const bg = {
//     blue: "bg-[#0057a8] hover:bg-blue-700",
//     green: "bg-[#66b032] hover:bg-green-700",
//     purple: "bg-purple-600 hover:bg-purple-800"
//   };
//   return (
//     <button className={`${bg[color]} text-white px-5 py-2 rounded shadow-md`}>
//       {text}
//     </button>
//   );
// }

// function Section({ title, items, isAdmin, fetchData, type }) {
//   if (items.length === 0) return (
//     <div className="mt-8">
//       <h3 className="text-xl font-semibold text-[#0057a8] mb-3">{title}</h3>
//       <p className="text-gray-500">No {title.toLowerCase()}</p>
//     </div>
//   );

//   return (
//     <div className="mt-8">
//       <h3 className="text-xl font-semibold text-[#0057a8] mb-3">{title}</h3>
//       <div className="space-y-3">
//         {items.map(item => (
//           <div key={item.id} className="border p-4 rounded shadow-md flex justify-between items-center">
//             <div>
//               <h4 className="font-semibold">{item.category || item.item_name || item.event_name}</h4>
//               <p className="text-sm text-gray-700">{item.description}</p>

//               {item.profiles ? (
//                 <p className="text-xs text-gray-500">
//                   Submitted by: {item.profiles.full_name} ({item.profiles.email})
//                 </p>
//               ) : (
//                 <p className="text-xs text-gray-500">Submitted by: Unknown</p>
//               )}

//               {item.status && (
//                 <span className="text-xs text-gray-500">Status: {item.status}</span>
//               )}
//             </div>

//             {isAdmin && (
//               <div className="flex gap-2">
//                 {type === "complaint" && (
//                   <button
//                     className="bg-yellow-500 text-white px-2 py-1 rounded"
//                     onClick={async () => {
//                       const newStatus = item.status === "submitted" ? "resolved" : "submitted";
//                       await supabase.from("complaints").update({ status: newStatus }).eq("id", item.id);
//                       fetchData();
//                     }}
//                   >
//                     Toggle Status
//                   </button>
//                 )}
//                 <button
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                   onClick={async () => {
//                     const tableMap = { complaint: "complaints", lost: "lost_found_items", volunteer: "volunteers" };
//                     if (confirm(`Delete this ${title}?`)) {
//                       await supabase.from(tableMap[type]).delete().eq("id", item.id);
//                       fetchData();
//                     }
//                   }}
//                 >
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }














// import { useEffect, useState } from "react";
// import { supabase } from "../supabaseClient";

// export default function Dashboard() {
//   const [stats, setStats] = useState({ complaints: 0, pending: 0, lost: 0, volunteers: 0 });
//   const [recentComplaints, setRecentComplaints] = useState([]);
//   const [lostItems, setLostItems] = useState([]);
//   const [volunteers, setVolunteers] = useState([]);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => { fetchData(); }, []);

//   const fetchData = async () => {
//     try {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) return;

//       const { data: profile } = await supabase
//         .from("profiles")
//         .select("role, full_name, email")
//         .eq("id", user.id)
//         .single();

//       const admin = profile?.role === "admin";
//       setIsAdmin(admin);

//       // ----------------
//       // Fetch complaints directly with full_name & email saved in table
//       let complaintsQuery = supabase.from("complaints").select("*");
//       let lostQuery = supabase.from("lost_found_items").select("*");
//       let volunteersQuery = supabase.from("volunteers").select("*");

//       if (!admin) {
//         complaintsQuery = complaintsQuery.eq("user_id", user.id);
//         lostQuery = lostQuery.eq("user_id", user.id);
//         volunteersQuery = volunteersQuery.eq("user_id", user.id);
//       }

//       const { data: complaints } = await complaintsQuery;
//       const { data: lost } = await lostQuery;
//       const { data: volunteers } = await volunteersQuery;

//       const { data: recent } = await complaintsQuery.order("created_at", { ascending: false }).limit(3);

//       // ----------------
//       // Stats
//       setStats({
//         complaints: complaints?.length || 0,
//         pending: complaints?.filter(c => c.status === "submitted").length || 0,
//         lost: lost?.length || 0,
//         volunteers: volunteers?.length || 0
//       });

//       setRecentComplaints(recent || []);
//       setLostItems(lost || []);
//       setVolunteers(volunteers || []);
//     } catch (err) {
//       console.error("Dashboard fetch error:", err);
//     }
//   };

//   return (
//     <div className="p-6 space-y-10">
//       <h2 className="text-3xl font-bold text-[#0057a8]">Dashboard Overview</h2>

//       {/* Stats Cards */}
//       <div className="grid md:grid-cols-4 gap-6">
//         <StatCard title="Total Complaints" value={stats.complaints} color="blue" />
//         <StatCard title="Pending Complaints" value={stats.pending} color="yellow" />
//         <StatCard title="Lost Items" value={stats.lost} color="red" />
//         <StatCard title="Volunteer Events" value={stats.volunteers} color="green" />
//       </div>

//       {/* Quick Actions */}
//       <div className="flex gap-4 flex-wrap">
//         <ActionButton text="New Complaint" color="blue" />
//         <ActionButton text="Post Lost Item" color="green" />
//         <ActionButton text="Volunteer Now" color="purple" />
//       </div>

//       {/* Sections */}
//       <Section title="General complaints" items={recentComplaints} isAdmin={isAdmin} fetchData={fetchData} type="complaint" />
//       <Section title="Lost Items" items={lostItems} isAdmin={isAdmin} fetchData={fetchData} type="lost" />
//       <Section title="Volunteer Events" items={volunteers} isAdmin={isAdmin} fetchData={fetchData} type="volunteer" />
//     </div>
//   );
// }

// // ---------------------- Components ----------------------

// function StatCard({ title, value, color }) {
//   const colors = {
//     blue: "border-blue-500",
//     yellow: "border-yellow-500",
//     red: "border-red-500",
//     green: "border-green-500"
//   };
//   return (
//     <div className={`bg-white shadow-lg p-5 rounded border-l-4 ${colors[color]}`}>
//       <h4 className="text-gray-500">{title}</h4>
//       <p className="text-2xl font-bold">{value}</p>
//     </div>
//   );
// }

// function ActionButton({ text, color }) {
//   const bg = {
//     blue: "bg-[#0057a8] hover:bg-blue-700",
//     green: "bg-[#66b032] hover:bg-green-700",
//     purple: "bg-purple-600 hover:bg-purple-800"
//   };
//   return (
//     <button className={`${bg[color]} text-white px-5 py-2 rounded shadow-md`}>
//       {text}
//     </button>
//   );
// }

// function Section({ title, items, isAdmin, fetchData, type }) {
//   if (items.length === 0) return (
//     <div className="mt-8">
//       <h3 className="text-xl font-semibold text-[#0057a8] mb-3">{title}</h3>
//       <p className="text-gray-500">No {title.toLowerCase()}</p>
//     </div>
//   );

//   return (
//     <div className="mt-8">
//       <h3 className="text-xl font-semibold text-[#0057a8] mb-3">{title}</h3>
//       <div className="space-y-3">
//         {items.map(item => (
//           <div key={item.id} className="border p-4 rounded shadow-md flex justify-between items-center">
//             <div>
//               <h4 className="font-semibold">{item.category || item.item_name || item.event_name}</h4>
//               <p className="text-sm text-gray-700">{item.description}</p>

//               <p className="text-xs text-gray-500">
//                 Submitted by: {item.full_name || "Unknown"} ({item.email || "Unknown"})
//               </p>

//               {item.status && (
//                 <span className="text-xs text-gray-500">Status: {item.status}</span>
//               )}
//             </div>

//             {isAdmin && (
//               <div className="flex gap-2">
//                 {type === "complaint" && (
//                   <button
//                     className="bg-yellow-500 text-white px-2 py-1 rounded"
//                     onClick={async () => {
//                       const newStatus = item.status === "submitted" ? "resolved" : "submitted";
//                       await supabase.from("complaints").update({ status: newStatus }).eq("id", item.id);
//                       fetchData(); // Refresh dashboard instantly
//                     }}
//                   >
//                     Toggle Status
//                   </button>
//                 )}
//                 <button
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                   onClick={async () => {
//                     const tableMap = { complaint: "complaints", lost: "lost_found_items", volunteer: "volunteers" };
//                     if (confirm(`Delete this ${title}?`)) {
//                       await supabase.from(tableMap[type]).delete().eq("id", item.id);
//                       fetchData(); // Refresh dashboard instantly
//                     }
//                   }}
//                 >
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




















// import { useEffect, useState } from "react";
// import { supabase } from "../supabaseClient";

// export default function Dashboard() {
//   const [stats, setStats] = useState({ complaints: 0, pending: 0, lost: 0, volunteers: 0 });
//   const [recentComplaints, setRecentComplaints] = useState([]);
//   const [lostItems, setLostItems] = useState([]);
//   const [volunteers, setVolunteers] = useState([]);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => { fetchData(); }, []);

//   const fetchData = async () => {
//     try {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) return;

//       const { data: profile } = await supabase
//         .from("profiles")
//         .select("role, full_name, email")
//         .eq("id", user.id)
//         .single();

//       const admin = profile?.role === "admin";
//       setIsAdmin(admin);

//       // Fetch data
//       let complaintsQuery = supabase.from("complaints").select("*");
//       let lostQuery = supabase.from("lost_found_items").select("*");
//       let volunteersQuery = supabase.from("volunteers").select("*");

//       if (!admin) {
//         complaintsQuery = complaintsQuery.eq("user_id", user.id);
//         lostQuery = lostQuery.eq("user_id", user.id);
//         volunteersQuery = volunteersQuery.eq("user_id", user.id);
//       }

//       const { data: complaints } = await complaintsQuery;
//       const { data: lost } = await lostQuery;
//       const { data: volunteers } = await volunteersQuery;

//       const { data: recent } = await complaintsQuery.order("created_at", { ascending: false }).limit(3);

//       setStats({
//         complaints: complaints?.length || 0,
//         pending: complaints?.filter(c => c.status === "submitted").length || 0,
//         lost: lost?.length || 0,
//         volunteers: volunteers?.length || 0
//       });

//       setRecentComplaints(recent || []);
//       setLostItems(lost || []);
//       setVolunteers(volunteers || []);
//     } catch (err) {
//       console.error("Dashboard fetch error:", err);
//     }
//   };

//   return (
//     <div className="p-6 space-y-10">
//       <h2 className="text-3xl font-bold text-[#0057a8]">Dashboard Overview</h2>

//       {/* Stats Cards */}
//       <div className="grid md:grid-cols-4 gap-6">
//         <StatCard title="Total Complaints" value={stats.complaints} color="blue" />
//         <StatCard title="Pending Complaints" value={stats.pending} color="yellow" />
//         <StatCard title="Lost Items" value={stats.lost} color="red" />
//         <StatCard title="Volunteer Events" value={stats.volunteers} color="green" />
//       </div>

//       {/* Quick Actions */}
//       <div className="flex gap-4 flex-wrap">
//         <ActionButton text="New Complaint" color="blue" />
//         <ActionButton text="Post Lost Item" color="green" />
//         <ActionButton text="Volunteer Now" color="purple" />
//       </div>

//       {/* Sections */}
//       <Section title="General Complaints" items={recentComplaints} isAdmin={isAdmin} fetchData={fetchData} type="complaint" />
//       <Section title="Lost Items" items={lostItems} isAdmin={isAdmin} fetchData={fetchData} type="lost" />
//       <Section title="Volunteer Events" items={volunteers} isAdmin={isAdmin} fetchData={fetchData} type="volunteer" />
//     </div>
//   );
// }

// // ---------------------- Components ----------------------

// function StatCard({ title, value, color }) {
//   const colors = {
//     blue: "border-blue-500",
//     yellow: "border-yellow-500",
//     red: "border-red-500",
//     green: "border-green-500"
//   };
//   return (
//     <div className={`bg-white shadow-lg p-5 rounded border-l-4 ${colors[color]}`}>
//       <h4 className="text-gray-500">{title}</h4>
//       <p className="text-2xl font-bold">{value}</p>
//     </div>
//   );
// }

// function ActionButton({ text, color }) {
//   const bg = {
//     blue: "bg-[#0057a8] hover:bg-blue-700",
//     green: "bg-[#66b032] hover:bg-green-700",
//     purple: "bg-purple-600 hover:bg-purple-800"
//   };
//   return (
//     <button className={`${bg[color]} text-white px-5 py-2 rounded shadow-md`}>
//       {text}
//     </button>
//   );
// }

// function Section({ title, items, isAdmin, fetchData, type }) {
//   const [editingId, setEditingId] = useState(null);
//   const [newStatus, setNewStatus] = useState("");

//   if (items.length === 0) return (
//     <div className="mt-8">
//       <h3 className="text-xl font-semibold text-[#0057a8] mb-3">{title}</h3>
//       <p className="text-gray-500">No {title.toLowerCase()}</p>
//     </div>
//   );

//   const saveStatus = async (id) => {
//     try {
//       await supabase.from("complaints").update({ status: newStatus }).eq("id", id);
//       setEditingId(null);
//       setNewStatus("");
//       fetchData();
//     } catch (err) {
//       console.error("Error updating status:", err.message);
//     }
//   };

//   return (
//     <div className="mt-8">
//       <h3 className="text-xl font-semibold text-[#0057a8] mb-3">{title}</h3>
//       <div className="space-y-3">
//         {items.map(item => (
//           <div key={item.id} className="border p-4 rounded shadow-md flex justify-between items-center">
//             <div>
//               <h4 className="font-semibold">{item.category || item.item_name || item.event_name}</h4>
//               <p className="text-sm text-gray-700">{item.description}</p>
//               <p className="text-xs text-gray-500">
//                 Submitted by: {item.full_name || "Unknown"} ({item.email || "Unknown"})
//               </p>
//               {item.status && (
//                 <span className={`text-xs font-medium mt-1 ${
//                   item.status === "resolved" ? "text-green-600" : "text-yellow-600"
//                 }`}>
//                   Status: {item.status === "submitted" ? "Pending" : "Resolved"}
//                 </span>
//               )}
//             </div>

//             {isAdmin && (
//               <div className="flex gap-2 items-center">
//                 {type === "complaint" && (
//                   editingId === item.id ? (
//                     <>
//                       <select
//                         value={newStatus}
//                         onChange={(e) => setNewStatus(e.target.value)}
//                         className="border p-1 rounded"
//                       >
//                         <option value="submitted">Pending</option>
//                         <option value="resolved">Resolved</option>
//                       </select>
//                       <button
//                         onClick={() => saveStatus(item.id)}
//                         className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setEditingId(null)}
//                         className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
//                       >
//                         Cancel
//                       </button>
//                     </>
//                   ) : (
//                     <button
//                       onClick={() => { setEditingId(item.id); setNewStatus(item.status); }}
//                       className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
//                     >
//                       Edit
//                     </button>
//                   )
//                 )}

//                 {/* Delete button for all types */}
//                 <button
//                   className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                   onClick={async () => {
//                     const tableMap = { complaint: "complaints", lost: "lost_found_items", volunteer: "volunteers" };
//                     if (confirm(`Delete this ${title}?`)) {
//                       await supabase.from(tableMap[type]).delete().eq("id", item.id);
//                       fetchData();
//                     }
//                   }}
//                 >
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }






















// import { useEffect, useState } from "react";
// import { supabase } from "../supabaseClient";

// export default function Dashboard() {
//   const [stats, setStats] = useState({ complaints: 0, pending: 0, lost: 0, volunteers: 0 });
//   const [recentComplaints, setRecentComplaints] = useState([]);
//   const [lostItems, setLostItems] = useState([]);
//   const [volunteers, setVolunteers] = useState([]);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => { fetchData(); }, []);

//   const fetchData = async () => {
//     try {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) return;

//       const { data: profile } = await supabase
//         .from("profiles")
//         .select("role, full_name, email")
//         .eq("id", user.id)
//         .single();

//       const admin = profile?.role === "admin";
//       setIsAdmin(admin);

//       // Fetch data
//       let complaintsQuery = supabase.from("complaints").select("*");
//       let lostQuery = supabase.from("lost_found_items").select("*");
//       let volunteersQuery = supabase.from("volunteers").select("*");

//       if (!admin) {
//         complaintsQuery = complaintsQuery.eq("user_id", user.id);
//         lostQuery = lostQuery.eq("user_id", user.id);
//         volunteersQuery = volunteersQuery.eq("user_id", user.id);
//       }

//       const { data: complaints } = await complaintsQuery;
//       const { data: lost } = await lostQuery;
//       const { data: volunteers } = await volunteersQuery;

//       const { data: recent } = await complaintsQuery.order("created_at", { ascending: false }).limit(3);

//       setStats({
//         complaints: complaints?.length || 0,
//         pending: complaints?.filter(c => c.status === "submitted").length || 0,
//         lost: lost?.length || 0,
//         volunteers: volunteers?.length || 0
//       });

//       setRecentComplaints(recent || []);
//       setLostItems(lost || []);
//       setVolunteers(volunteers || []);
//     } catch (err) {
//       console.error("Dashboard fetch error:", err);
//     }
//   };

//   return (
//     <div className="p-6 space-y-10">
//       <h2 className="text-3xl font-bold text-[#0057a8]">Dashboard Overview</h2>

//       {/* Stats Cards */}
//       <div className="grid md:grid-cols-4 gap-6">
//         <StatCard title="Total Complaints" value={stats.complaints} color="blue" />
//         <StatCard title="Pending Complaints" value={stats.pending} color="yellow" />
//         <StatCard title="Lost Items" value={stats.lost} color="red" />
//         <StatCard title="Volunteer Events" value={stats.volunteers} color="green" />
//       </div>

//       {/* Quick Actions */}
//       <div className="flex gap-4 flex-wrap">
//         <ActionButton text="New Complaint" color="blue" />
//         <ActionButton text="Post Lost Item" color="green" />
//         <ActionButton text="Volunteer Now" color="purple" />
//       </div>

//       {/* Sections */}
//       <Section title="General Complaints" items={recentComplaints} isAdmin={isAdmin} fetchData={fetchData} type="complaint" />
//       <Section title="Lost Items" items={lostItems} isAdmin={isAdmin} fetchData={fetchData} type="lost" />
//       <Section title="Volunteer Events" items={volunteers} isAdmin={isAdmin} fetchData={fetchData} type="volunteer" />
//     </div>
//   );
// }

// // ---------------------- Components ----------------------

// function StatCard({ title, value, color }) {
//   const colors = {
//     blue: "border-blue-500",
//     yellow: "border-yellow-500",
//     red: "border-red-500",
//     green: "border-green-500"
//   };
//   return (
//     <div className={`bg-white shadow-lg p-5 rounded border-l-4 ${colors[color]}`}>
//       <h4 className="text-gray-500">{title}</h4>
//       <p className="text-2xl font-bold">{value}</p>
//     </div>
//   );
// }

// function ActionButton({ text, color }) {
//   const bg = {
//     blue: "bg-[#0057a8] hover:bg-blue-700",
//     green: "bg-[#66b032] hover:bg-green-700",
//     purple: "bg-purple-600 hover:bg-purple-800"
//   };
//   return (
//     <button className={`${bg[color]} text-white px-5 py-2 rounded shadow-md`}>
//       {text}
//     </button>
//   );
// }

// function Section({ title, items, isAdmin, fetchData, type }) {
//   const [editingId, setEditingId] = useState(null);
//   const [newStatus, setNewStatus] = useState("");

//   if (items.length === 0) return (
//     <div className="mt-8">
//       <h3 className="text-xl font-semibold text-[#0057a8] mb-3">{title}</h3>
//       <p className="text-gray-500">No {title.toLowerCase()}</p>
//     </div>
//   );

//   const saveStatus = async (id) => {
//     try {
//       await supabase.from("complaints").update({ status: newStatus }).eq("id", id);
//       setEditingId(null);
//       setNewStatus("");
//       fetchData();
//     } catch (err) {
//       console.error("Error updating status:", err.message);
//     }
//   };

//   return (
//     <div className="mt-8">
//       <h3 className="text-xl font-semibold text-[#0057a8] mb-3">{title}</h3>
//       <div className="space-y-3">
//         {items.map(item => (
//           <div key={item.id} className="border p-4 rounded shadow-md flex justify-between items-center">
//             <div>
//               <h4 className="font-semibold">{item.category || item.title || item.event_name}</h4>
//               <p className="text-sm text-gray-700">{item.description || item.message || ""}</p>
//               <p className="text-xs text-gray-500">
//                 Submitted by: {item.full_name || "Unknown"} ({item.email || "Unknown"})
//               </p>
//               {item.status && type === "complaint" && (
//                 <span className={`text-xs font-medium mt-1 ${
//                   item.status === "resolved" ? "text-green-600" : "text-yellow-600"
//                 }`}>
//                   Status: {item.status === "submitted" ? "Pending" : "Resolved"}
//                 </span>
//               )}
//             </div>

//             {isAdmin && (
//               <div className="flex gap-2 items-center">
//                 {/* Edit for complaints only */}
//                 {type === "complaint" && (
//                   editingId === item.id ? (
//                     <>
//                       <select
//                         value={newStatus}
//                         onChange={(e) => setNewStatus(e.target.value)}
//                         className="border p-1 rounded"
//                       >
//                         <option value="submitted">Pending</option>
//                         <option value="resolved">Resolved</option>
//                       </select>
//                       <button
//                         onClick={() => saveStatus(item.id)}
//                         className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setEditingId(null)}
//                         className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
//                       >
//                         Cancel
//                       </button>
//                     </>
//                   ) : (
//                     <button
//                       onClick={() => { setEditingId(item.id); setNewStatus(item.status); }}
//                       className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
//                     >
//                       Edit
//                     </button>
//                   )
//                 )}

//                 {/* Delete for all types */}
//                 <button
//                   className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                   onClick={async () => {
//                     const tableMap = { complaint: "complaints", lost: "lost_found_items", volunteer: "volunteers" };
//                     if (confirm(`Delete this ${title}?`)) {
//                       await supabase.from(tableMap[type]).delete().eq("id", item.id);
//                       fetchData();
//                     }
//                   }}
//                 >
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }























import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Dashboard() {
  const [stats, setStats] = useState({ complaints: 0, pending: 0, lost: 0, volunteers: 0 });
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [lostItems, setLostItems] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("role, full_name, email")
        .eq("id", user.id)
        .single();

      const admin = profile?.role === "admin";
      setIsAdmin(admin);

      // Fetch data
      let complaintsQuery = supabase.from("complaints").select("*");
      let lostQuery = supabase.from("lost_found_items").select("*");
      let volunteersQuery = supabase.from("volunteers").select("*");

      if (!admin) {
        complaintsQuery = complaintsQuery.eq("user_id", user.id);
        lostQuery = lostQuery.eq("user_id", user.id);
        volunteersQuery = volunteersQuery.eq("user_id", user.id);
      }

      const { data: complaints } = await complaintsQuery;
      const { data: lost } = await lostQuery;
      const { data: volunteers } = await volunteersQuery;

      const { data: recent } = await complaintsQuery.order("created_at", { ascending: false }).limit(3);

      setStats({
        complaints: complaints?.length || 0,
        pending: complaints?.filter(c => c.status === "submitted").length || 0,
        lost: lost?.length || 0,
        volunteers: volunteers?.length || 0
      });

      setRecentComplaints(recent || []);
      setLostItems(lost || []);
      setVolunteers(volunteers || []);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    }
  };

  return (
    <div className="p-6 space-y-10">
      <h2 className="text-3xl font-bold text-[#0057a8]">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard title="Total Complaints" value={stats.complaints} color="blue" />
        <StatCard title="Pending Complaints" value={stats.pending} color="yellow" />
        <StatCard title="Lost Items" value={stats.lost} color="red" />
        <StatCard title="Volunteer Events" value={stats.volunteers} color="green" />
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 flex-wrap">
        <ActionButton text="New Complaint" color="blue" />
        <ActionButton text="Post Lost Item" color="green" />
        <ActionButton text="Volunteer Now" color="purple" />
      </div>

      {/* Sections */}
      <Section title="General Complaints" items={recentComplaints} isAdmin={isAdmin} fetchData={fetchData} type="complaint" />
      <Section title="Lost Items" items={lostItems} isAdmin={isAdmin} fetchData={fetchData} type="lost" />
      <Section title="Volunteer Events" items={volunteers} isAdmin={isAdmin} fetchData={fetchData} type="volunteer" />
    </div>
  );
}

// ---------------------- Components ----------------------

function StatCard({ title, value, color }) {
  const colors = {
    blue: "border-blue-500",
    yellow: "border-yellow-500",
    red: "border-red-500",
    green: "border-green-500"
  };
  return (
    <div className={`bg-white shadow-lg p-5 rounded border-l-4 ${colors[color]}`}>
      <h4 className="text-gray-500">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function ActionButton({ text, color }) {
  const bg = {
    blue: "bg-[#0057a8] hover:bg-blue-700",
    green: "bg-[#66b032] hover:bg-green-700",
    purple: "bg-purple-600 hover:bg-purple-800"
  };
  return (
    <button className={`${bg[color]} text-white px-5 py-2 rounded shadow-md`}>
      {text}
    </button>
  );
}

function Section({ title, items, isAdmin, fetchData, type }) {
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  if (items.length === 0) return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-[#0057a8] mb-3">{title}</h3>
      <p className="text-gray-500">No {title.toLowerCase()}</p>
    </div>
  );

  const saveEdit = async (id) => {
    try {
      const tableMap = { complaint: "complaints", lost: "lost_found_items", volunteer: "volunteers" };
      const updates = { title: newTitle, description: newDesc };
      if (type === "volunteer") updates.event_name = newTitle;
      await supabase.from(tableMap[type]).update(updates).eq("id", id);
      setEditingId(null);
      fetchData();
    } catch (err) {
      console.error("Edit error:", err.message);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-[#0057a8] mb-3">{title}</h3>
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="border p-4 rounded shadow-md flex justify-between items-center">
            <div>
              <h4 className="font-semibold">{item.category || item.title || item.event_name}</h4>
              <p className="text-sm text-gray-700">{item.description || item.message || ""}</p>
              <p className="text-xs text-gray-500">
                {/* Submitted by:  ({item.email || "Unknown"}) */}
              </p>
              {item.status && type === "complaint" && (
                <span className={`text-xs font-medium mt-1 ${item.status === "resolved" ? "text-green-600" : "text-yellow-600"}`}>
                  Status: {item.status === "submitted" ? "Pending" : "Resolved"}
                </span>
              )}
            </div>

            {isAdmin && (
              <div className="flex gap-2 items-center">
                {/* Edit button for all types */}
                {(type === "complaint" || type === "lost" || type === "volunteer") && (
                  editingId === item.id ? (
                    <>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="border p-1 rounded"
                      />
                      <textarea
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        className="border p-1 rounded mt-1"
                      />
                      <button
                        onClick={() => saveEdit(item.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setNewTitle(item.title || item.event_name || item.category);
                        setNewDesc(item.description || item.message);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  )
                )}

                {/* Delete button */}
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  onClick={async () => {
                    const tableMap = { complaint: "complaints", lost: "lost_found_items", volunteer: "volunteers" };
                    if (confirm(`Delete this ${title}?`)) {
                      await supabase.from(tableMap[type]).delete().eq("id", item.id);
                      fetchData();
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}