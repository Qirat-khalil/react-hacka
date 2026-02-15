// // ComplaintsForm.jsx
// import { useState } from "react";
// import { supabase } from "../supabaseClient";

// export default function ComplaintsForm() {
//   const [category,setCategory] = useState("");
//   const [description,setDescription] = useState("");
//   const [message,setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { data: userData } = await supabase.auth.getUser();

//     await supabase.from("complaints").insert([
//       {
//         user_id: userData.user.id,
//         category,
//         description,
//         status: "submitted"
//       }
//     ]);

//     setCategory("");
//     setDescription("");
//     setMessage("Complaint submitted successfully!");
//   };

//   return (
//     <div className="p-4 border rounded shadow bg-white">
//       <h3 className="font-bold text-lg mb-2">Submit Complaint</h3>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//         <input
//           placeholder="Category"
//           value={category}
//           onChange={(e)=>setCategory(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e)=>setDescription(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <button className="bg-[#66b032] text-white py-2 rounded mt-2">Submit</button>
//       </form>
//       {message && <p className="text-green-600 mt-2">{message}</p>}
//     </div>
//   );
// }









// import { useState } from "react";
// import { supabase } from "../supabaseClient";

// export default function ComplaintsForm() {
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Get logged-in user
//       const { data: userData, error: userError } = await supabase.auth.getUser();
//       if (userError) throw userError;
//       if (!userData.user) throw new Error("User not logged in");

//       const userId = userData.user.id;

//       // Insert complaint
//       const { error: insertError } = await supabase
//         .from("complaints")
//         .insert([{ user_id: userId, category, description, status: "submitted" }]);
//       if (insertError) throw insertError;

//       // Insert notification for admin
//       const { error: notifError } = await supabase
//         .from("notifications")
//         .insert([{ user_id: userId, message: `New complaint submitted: ${category}` }]);
//       if (notifError) throw notifError;

//       // Reset form
//       setCategory("");
//       setDescription("");
//       setMessage("Complaint submitted successfully!");
//     } catch (err) {
//       setMessage("Error: " + err.message);
//     }
//   };

//   return (
//     <div className="p-4 border rounded shadow bg-white">
//       <h3 className="font-bold text-lg mb-2">Submit Complaint</h3>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//         <input
//           placeholder="Category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <button className="bg-[#66b032] text-white py-2 rounded mt-2">Submit</button>
//       </form>
//       {message && <p className={`mt-2 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
//     </div>
//   );
// }




















// import { useState } from "react";
// import { supabase } from "../supabaseClient";

// export default function ComplaintsForm() {
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // ✅ Get the logged-in user
//       const { data: { user }, error: userError } = await supabase.auth.getUser();
//       if (userError) throw userError;
//       if (!user) throw new Error("User not logged in");

//       const userId = user.id;

//       // ✅ Insert complaint without specifying 'id' (auto-generated)
//       const { data: complaintData, error: insertError } = await supabase
//         .from("complaints")
//         .insert([
//           { 
//             user_id: userId, 
//             category, 
//             description, 
//             status: "submitted" 
//           }
//         ])
//         .select(); // select returns the inserted row

//       if (insertError) throw insertError;

//       // ✅ Insert notification for admin
//       const { error: notifError } = await supabase
//         .from("notifications")
//         .insert([
//           { 
//             user_id: userId, 
//             message: `New complaint submitted: ${category}` 
//           }
//         ]);

//       if (notifError) throw notifError;

//       // Reset form
//       setCategory("");
//       setDescription("");
//       setMessage("Complaint submitted successfully!");
//     } catch (err) {
//       console.log(err);
//       setMessage("Error: " + err.message);
//     }
//   };

//   return (
//     <div className="p-4 border rounded shadow bg-white">
//       <h3 className="font-bold text-lg mb-2">Submit Complaint</h3>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//         <input
//           placeholder="Category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <button className="bg-[#66b032] text-white py-2 rounded mt-2">
//           Submit
//         </button>
//       </form>
//       {message && (
//         <p className={`mt-2 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// }























// import { useState } from "react";
// import { supabase } from "../supabaseClient";

// export default function ComplaintsForm() {
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // 1️⃣ Get logged-in user
//       const { data: { user }, error: userError } = await supabase.auth.getUser();
//       if (userError) throw userError;
//       if (!user) throw new Error("User not logged in");

//       const userId = user.id;

//       // 2️⃣ Ensure user exists in profiles table
//       const { data: profile } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", userId)
//         .single();

//       if (!profile) throw new Error("User profile not found in 'profiles' table");

//       // 3️⃣ Insert complaint (no manual id)
//       const { error: insertError } = await supabase
//         .from("complaints")
//         .insert([{ user_id: userId, category, description, status: "submitted" }]);
//       if (insertError) throw insertError;

//       // 4️⃣ Insert notification for admin
//       const { error: notifError } = await supabase
//         .from("notifications")
//         .insert([{ user_id: userId, message: `New complaint submitted: ${category}` }]);
//       if (notifError) throw notifError;

//       setCategory("");
//       setDescription("");
//       setMessage("Complaint submitted successfully!");
//     } catch (err) {
//       console.log(err);
//       setMessage("Error: " + err.message);
//     }
//   };

//   return (
//     <div className="p-4 border rounded shadow bg-white">
//       <h3 className="font-bold text-lg mb-2">Submit Complaint</h3>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//         <input
//           placeholder="Category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <button className="bg-[#66b032] text-white py-2 rounded mt-2">Submit</button>
//       </form>
//       {message && (
//         <p className={`mt-2 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// }
























// import { useState, useEffect } from "react";
// import { supabase } from "../supabaseClient";

// export default function ComplaintsForm() {
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [profile, setProfile] = useState(null);

//   // ✅ Profile fetch karna
//  useEffect(() => {
//   const fetchProfile = async () => {
//     try {
//       const { data: { user }, error: userError } = await supabase.auth.getUser();
//       if (userError) throw userError;
//       if (!user) throw new Error("User not logged in");

//       const { data: profileData, error: profileError } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", user.id)
//         .maybeSingle(); // ✅ safe version

//       if (profileError) throw profileError;
//       if (!profileData) throw new Error("User profile not found in 'profiles' table");

//       setProfile(profileData);
//     } catch (err) {
//       console.log(err);
//       setMessage("Error: " + err.message);
//     }
//   };

//   fetchProfile();
// }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     if (!category || !description) {
//       setMessage("Please fill all fields");
//       setLoading(false);
//       return;
//     }

//     try {
//       if (!profile) throw new Error("User profile not loaded");

//       const { error: insertError } = await supabase.from("complaints").insert([
//         {
//           user_id: profile.id,
//           category,
//           description,
//           status: "submitted",
//         },
//       ]);
//       if (insertError) throw insertError;

//       await supabase.from("notifications").insert([
//         {
//           user_id: profile.id,
//           message: `New complaint submitted: ${category}`,
//         },
//       ]);

//       setCategory("");
//       setDescription("");
//       setMessage("Complaint submitted successfully!");
//     } catch (err) {
//       console.log(err);
//       setMessage("Error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 border rounded shadow bg-white max-w-md mx-auto mt-10">
//       <h3 className="font-bold text-lg mb-2">Submit Complaint</h3>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//         <input
//           placeholder="Category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="border p-2 rounded"
//           required
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
//         <p className={`mt-2 font-medium ${
//           message.includes("success") ? "text-green-600" : "text-red-600"
//         }`}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// }




















// import { useState } from "react";
// import { supabase } from "../supabaseClient";

// export default function ComplaintsForm() {
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     if (!category || !description) {
//       setMessage("Please fill all fields");
//       setLoading(false);
//       return;
//     }

//     try {
//       // ✅ Logged-in user ka ID le lo
//       const { data: { user }, error: userError } = await supabase.auth.getUser();
//       if (userError) throw userError;
//       if (!user) throw new Error("User not logged in");

//       // ✅ Complaint insert kar do
//       const { error: insertError } = await supabase.from("complaints").insert([
//         {
//           user_id: user.id,
//           category,
//           description,
//           status: "submitted",
//         },
//       ]);
//       if (insertError) throw insertError;

//       // ✅ Admin ke liye notification
//       await supabase.from("notifications").insert([
//         {
//           user_id: user.id,
//           message: `New complaint submitted: ${category}`,
//         },
//       ]);

//       setCategory("");
//       setDescription("");
//       setMessage("Complaint submitted successfully!");
//     } catch (err) {
//       console.log(err);
//       setMessage("Error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 border rounded shadow bg-white max-w-md mx-auto mt-10">
//       <h3 className="font-bold text-lg mb-2">Submit Complaint</h3>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//         <input
//           placeholder="Category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="border p-2 rounded"
//           required
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
//         <p className={`mt-2 font-medium ${
//           message.includes("success") ? "text-green-600" : "text-red-600"
//         }`}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// }


















// import { useState } from "react";
// import { supabase } from "../supabaseClient";

// export default function ComplaintsForm() {
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     if (!category || !description) {
//       setMessage("Please fill all fields");
//       setLoading(false);
//       return;
//     }

//     try {
//       // ✅ Logged-in user ka ID le lo
//       const { data: { user }, error: userError } = await supabase.auth.getUser();
//       if (userError) throw userError;
//       if (!user) throw new Error("User not logged in");

//       // ✅ User ka profile le lo (full_name aur email)
//       const { data: profile, error: profileError } = await supabase
//         .from("profiles")
//         .select("full_name,email")
//         .eq("id", user.id)
//         .single();
//       if (profileError) throw profileError;

//       // ✅ Complaint insert karte waqt full_name & email bhi add kar do
//       const { error: insertError } = await supabase.from("complaints").insert([
//         {
//           user_id: user.id,
//           category,
//           description,
//           status: "submitted",
//           full_name: profile?.full_name || "Unknown",
//           email: profile?.email || "Unknown",
//         },
//       ]);
//       if (insertError) throw insertError;

//       // ✅ Admin ke liye notification
//       await supabase.from("notifications").insert([
//         {
//           user_id: user.id,
//           message: `New complaint submitted: ${category}`,
//         },
//       ]);

//       // Reset form
//       setCategory("");
//       setDescription("");
//       setMessage("Complaint submitted successfully!");
//     } catch (err) {
//       console.log(err);
//       setMessage("Error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 border rounded shadow bg-white max-w-md mx-auto mt-10">
//       <h3 className="font-bold text-lg mb-2">Submit Complaint</h3>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//         <input
//           placeholder="Category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="border p-2 rounded"
//           required
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
//         <p className={`mt-2 font-medium ${
//           message.includes("success") ? "text-green-600" : "text-red-600"
//         }`}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// }























import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function ComplaintsForm() {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!category || !description) {
      setMessage("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error("User not logged in");

      // ✅ Get user profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name,email")
        .eq("id", user.id)
        .single();

      // ✅ Insert complaint with name/email
      const { error: insertError } = await supabase.from("complaints").insert([
        {
          user_id: user.id,
          full_name: profile.full_name,
          email: profile.email,
          category,
          description,
          status: "submitted",
        },
      ]);
      if (insertError) throw insertError;

      setCategory("");
      setDescription("");
      setMessage("Complaint submitted successfully!");
    } catch (err) {
      console.log(err);
      setMessage("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white max-w-md mx-auto mt-10">
      <h3 className="font-bold text-lg mb-2">Submit Complaint</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`bg-[#66b032] text-white py-2 rounded mt-2 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {message && (
        <p className={`mt-2 font-medium ${
          message.includes("success") ? "text-green-600" : "text-red-600"
        }`}>
          {message}
        </p>
      )}
    </div>
  );
}