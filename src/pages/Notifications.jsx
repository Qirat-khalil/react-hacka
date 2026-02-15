// import { useState, useEffect } from "react";
// import { supabase } from "../supabaseClient";

// export default function Notifications(){

//   const [notifications,setNotifications]=useState([]);

//   useEffect(()=>{ fetchNotifications(); },[]);

//   const fetchNotifications = async ()=>{
//     const { data:userData } = await supabase.auth.getUser();

//     const { data } = await supabase
//       .from("notifications")
//       .select("*")
//       .eq("user_id", userData.user.id)
//       .order("created_at",{ascending:false});

//     setNotifications(data);
//   };

//   return(
//     <div className="p-6">
//       <h2 className="text-xl font-bold text-[#0057a8]">
//         Notifications
//       </h2>

//       {notifications.map(n=>(
//         <div key={n.id} className="border p-3 mt-3 rounded">
//           <p>{n.message}</p>
//         </div>
//       ))}
//     </div>
//   );
// }















import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) {
        setMessage("User not logged in");
        return;
      }

      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setNotifications(data || []);
    } catch (err) {
      console.log(err);
      setMessage("Error fetching notifications: " + err.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-[#0057a8]">Notifications</h2>

      {message && <p className="text-red-500 mt-2">{message}</p>}

      {notifications.length === 0 && !message && (
        <p className="mt-2 text-gray-600">No notifications yet.</p>
      )}

      {notifications.map((n) => (
        <div key={n.id} className="border p-3 mt-3 rounded">
          <p>{n.message}</p>
        </div>
      ))}
    </div>
  );
}