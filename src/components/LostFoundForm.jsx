// import { useState } from "react";
// import { supabase } from "../supabaseClient";

// export default function LostFoundForm() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [location, setLocation] = useState("");
//   const [type, setType] = useState("lost"); // default lost
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     if (!title || !type) {
//       setMessage("Please fill required fields");
//       setLoading(false);
//       return;
//     }

//     try {
//       const { data: { user }, error: userError } = await supabase.auth.getUser();
//       if (userError) throw userError;
//       if (!user) throw new Error("User not logged in");

//       const { error: insertError } = await supabase.from("lost_found_items").insert([
//         {
//           user_id: user.id,
//           title,
//           description,
//           location,
//           type,
//         },
//       ]);
//       if (insertError) throw insertError;

//       setTitle(""); setDescription(""); setLocation(""); setType("lost");
//       setMessage("Lost/Found item submitted successfully!");
//     } catch (err) {
//       console.log(err);
//       setMessage("Error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 border rounded shadow bg-white max-w-md mx-auto mt-10">
//       <h3 className="font-bold text-lg mb-2">Lost & Found Item</h3>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//         <input
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <input
//           placeholder="Location"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <select
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="lost">Lost</option>
//           <option value="found">Found</option>
//         </select>
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

// export default function LostFoundForm() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [location, setLocation] = useState("");
//   const [type, setType] = useState("lost");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     if (!title || !type) {
//       setMessage("Please fill required fields");
//       setLoading(false);
//       return;
//     }

//     try {
//       const { error: insertError } = await supabase.from("lost_found_items").insert([
//         { title, description, location, type },
//       ]);
//       if (insertError) throw insertError;

//       setTitle(""); setDescription(""); setLocation(""); setType("lost");
//       setMessage("Lost/Found item submitted successfully!");
//     } catch (err) {
//       console.log(err);
//       setMessage("Error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 border rounded shadow bg-white max-w-md mx-auto mt-10">
//       <h3 className="font-bold text-lg mb-2">Lost & Found Item</h3>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//         <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border p-2 rounded" required />
//         <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="border p-2 rounded" />
//         <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} className="border p-2 rounded" />
//         <select value={type} onChange={e => setType(e.target.value)} className="border p-2 rounded">
//           <option value="lost">Lost</option>
//           <option value="found">Found</option>
//         </select>
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

export default function LostFoundForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("lost");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!title || !type) {
      setMessage("Please fill required fields");
      setLoading(false);
      return;
    }

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error("User not logged in");

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name,email")
        .eq("id", user.id)
        .single();

      const { error: insertError } = await supabase.from("lost_found_items").insert([
        {
          user_id: user.id,
          full_name: profile.full_name,
          email: profile.email,
          title,
          description,
          location,
          type
        },
      ]);
      if (insertError) throw insertError;

      setTitle(""); setDescription(""); setLocation(""); setType("lost");
      setMessage("Lost/Found item submitted successfully!");
    } catch (err) {
      console.log(err);
      setMessage("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white max-w-md mx-auto mt-10">
      <h3 className="font-bold text-lg mb-2">Lost & Found Item</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border p-2 rounded" required />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="border p-2 rounded" />
        <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} className="border p-2 rounded" />
        <select value={type} onChange={e => setType(e.target.value)} className="border p-2 rounded">
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
        <button type="submit" disabled={loading} className={`bg-[#66b032] text-white py-2 rounded mt-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {message && <p className={`mt-2 font-medium ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
    </div>
  );
}