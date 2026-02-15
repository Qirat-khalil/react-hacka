// import { useState } from "react";
// import { supabase } from "../supabaseClient";

// export default function VolunteersForm() {
//   const [eventName, setEventName] = useState("");
//   const [messageText, setMessageText] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     if (!eventName) {
//       setMessage("Please fill event name");
//       setLoading(false);
//       return;
//     }

//     try {
//       const { data: { user }, error: userError } = await supabase.auth.getUser();
//       if (userError) throw userError;
//       if (!user) throw new Error("User not logged in");

//       const { error: insertError } = await supabase.from("volunteers").insert([
//         {
//           user_id: user.id,
//           event_name: eventName,
//           message: messageText,
//         },
//       ]);
//       if (insertError) throw insertError;

//       setEventName(""); setMessageText("");
//       setMessage("Volunteer entry submitted successfully!");
//     } catch (err) {
//       console.log(err);
//       setMessage("Error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 border rounded shadow bg-white max-w-md mx-auto mt-10">
//       <h3 className="font-bold text-lg mb-2">Volunteer Registration</h3>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//         <input
//           placeholder="Event Name"
//           value={eventName}
//           onChange={(e) => setEventName(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <textarea
//           placeholder="Message (optional)"
//           value={messageText}
//           onChange={(e) => setMessageText(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className={`bg-[#66b032] text-white py-2 rounded mt-2 ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           {loading ? "Submitting..." : "Submit"}
//         </button>
//       </form>
//       {message && (
//         <p className={`mt-2 font-medium ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// }
















// import { useState } from "react";
// import { supabase } from "../supabaseClient";

// export default function VolunteersForm() {
//   const [eventName, setEventName] = useState("");
//   const [messageText, setMessageText] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     if (!eventName) {
//       setMessage("Please fill event name");
//       setLoading(false);
//       return;
//     }

//     try {
//       const { error: insertError } = await supabase.from("volunteers").insert([
//         { event_name: eventName, message: messageText },
//       ]);
//       if (insertError) throw insertError;

//       setEventName(""); setMessageText("");
//       setMessage("Volunteer entry submitted successfully!");
//     } catch (err) {
//       console.log(err);
//       setMessage("Error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 border rounded shadow bg-white max-w-md mx-auto mt-10">
//       <h3 className="font-bold text-lg mb-2">Volunteer Registration</h3>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//         <input placeholder="Event Name" value={eventName} onChange={e => setEventName(e.target.value)} className="border p-2 rounded" required />
//         <textarea placeholder="Message (optional)" value={messageText} onChange={e => setMessageText(e.target.value)} className="border p-2 rounded" />
//         <button type="submit" disabled={loading} className={`bg-[#66b032] text-white py-2 rounded mt-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
//           {loading ? "Submitting..." : "Submit"}
//         </button>
//       </form>
//       {message && <p className={`mt-2 font-medium ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
//     </div>
//   );
// }
















import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function VolunteersForm() {
  const [eventName, setEventName] = useState("");
  const [messageText, setMessageText] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!eventName) {
      setMessage("Please fill event name");
      setLoading(false);
      return;
    }

    try {
      // ✅ GET LOGGED IN USER
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setMessage("User not logged in");
        setLoading(false);
        return;
      }

      // ✅ INSERT WITH user_id
      const { error } = await supabase.from("volunteers").insert([
        {
          event_name: eventName,
          message: messageText,
          user_id: user.id   // 🔥 VERY IMPORTANT
        },
      ]);

      if (error) throw error;

      setEventName("");
      setMessageText("");
      setMessage("Volunteer entry submitted successfully!");
    } catch (err) {
      console.log(err);
      setMessage("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white max-w-md mx-auto mt-10">
      <h3 className="font-bold text-lg mb-2">Volunteer Registration</h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          placeholder="Event Name"
          value={eventName}
          onChange={e => setEventName(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <textarea
          placeholder="Message (optional)"
          value={messageText}
          onChange={e => setMessageText(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[#66b032] text-white py-2 rounded mt-2"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {message && (
        <p className="mt-2 font-medium text-green-600">
          {message}
        </p>
      )}
    </div>
  );
}