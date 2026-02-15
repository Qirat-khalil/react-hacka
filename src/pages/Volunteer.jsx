// import { useState, useEffect } from "react";
// import { supabase } from "../supabaseClient";

// export default function Volunteer() {

//   const [event,setEvent] = useState("");
//   const [availability,setAvailability] = useState("");
//   const [volunteers,setVolunteers] = useState([]);

//   useEffect(()=>{ fetchVolunteers(); },[]);

//   const fetchVolunteers = async () => {
//     const { data:userData } = await supabase.auth.getUser();

//     const { data } = await supabase
//       .from("volunteers")
//       .select("*")
//       .eq("user_id", userData.user.id)
//       .order("created_at",{ascending:false});

//     setVolunteers(data);
//   };

//   const handleSubmit = async (e)=>{
//     e.preventDefault();
//     const { data:userData } = await supabase.auth.getUser();

//     await supabase.from("volunteers").insert([
//       {
//         user_id:userData.user.id,
//         event,
//         availability
//       }
//     ]);

//     fetchVolunteers();
//     setEvent("");
//     setAvailability("");
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold text-[#0057a8]">
//         Volunteer Registration
//       </h2>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
//         <input
//           placeholder="Event Name"
//           value={event}
//           onChange={(e)=>setEvent(e.target.value)}
//           className="border p-2"
//         />

//         <input
//           placeholder="Availability"
//           value={availability}
//           onChange={(e)=>setAvailability(e.target.value)}
//           className="border p-2"
//         />

//         <button className="bg-[#66b032] text-white py-2 rounded">
//           Register
//         </button>
//       </form>

//       {volunteers.map(v=>(
//         <div key={v.id} className="border p-3 mt-3 rounded">
//           <h4>{v.event}</h4>
//           <p>{v.availability}</p>
//         </div>
//       ))}
//     </div>
//   );
// }











import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function Volunteer() {
  const [event, setEvent] = useState("");
  const [availability, setAvailability] = useState("");
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const { data } = await supabase
      .from("volunteers")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false });
    setVolunteers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: userData } = await supabase.auth.getUser();

    await supabase.from("volunteers").insert([
      { user_id: userData.user.id, event_name: event, message: availability }
    ]);

    // Notify admin
    await supabase.from("notifications").insert([
      { user_id: userData.user.id, message: `New volunteer registration: ${event}` }
    ]);

    setEvent("");
    setAvailability("");
    fetchVolunteers();
  };

  return (
    <div className="p-6 border rounded shadow">
      <h2 className="text-xl font-bold text-[#0057a8]">Volunteer Registration</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
        <input
          placeholder="Event Name"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          className="border p-2"
        />
        <input
          placeholder="Availability"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="border p-2"
        />
        <button className="bg-[#66b032] text-white py-2 rounded">Register</button>
      </form>

      {volunteers.map((v) => (
        <div key={v.id} className="border p-3 mt-3 rounded">
          <h4>{v.event_name}</h4>
          <p>{v.message}</p>
        </div>
      ))}
    </div>
  );
}