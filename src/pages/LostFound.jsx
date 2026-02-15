// import { useState, useEffect } from "react";
// import { supabase } from "../supabaseClient";

// export default function LostFound() {
//   const [title,setTitle]=useState("");
//   const [description,setDescription]=useState("");
//   const [items,setItems]=useState([]);

//   useEffect(()=>{ fetchItems(); },[]);

//   const fetchItems = async ()=>{
//     const { data } = await supabase
//       .from("lost_found_items")
//       .select("*")
//       .order("created_at",{ascending:false});
//     setItems(data);
//   };

//   const handleSubmit = async (e)=>{
//     e.preventDefault();
//     const { data:userData } = await supabase.auth.getUser();

//     await supabase.from("lost_found_items").insert([
//       {
//         user_id:userData.user.id,
//         title,
//         description,
//         type:"lost",
//         status:"pending"
//       }
//     ]);

//     fetchItems();
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-[#0057a8] font-bold text-xl">
//         Lost & Found
//       </h2>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
//         <input placeholder="Title"
//           onChange={(e)=>setTitle(e.target.value)}
//           className="border p-2"/>
//         <textarea placeholder="Description"
//           onChange={(e)=>setDescription(e.target.value)}
//           className="border p-2"/>
//         <button className="bg-[#66b032] text-white py-2">
//           Post Item
//         </button>
//       </form>

//       {items.map(item=>(
//         <div key={item.id}
//           className="border p-3 mt-3 rounded">
//           <h4>{item.title}</h4>
//           <p>{item.description}</p>
//           <span className="text-sm">
//             {item.status}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// }










import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function LostFound() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const { data } = await supabase
      .from("lost_found_items")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false });
    setItems(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: userData } = await supabase.auth.getUser();

    await supabase.from("lost_found_items").insert([
      { user_id: userData.user.id, title, description, type: "lost" }
    ]);

    // Notify admin
    await supabase.from("notifications").insert([
      { user_id: userData.user.id, message: `New lost/found item submitted: ${title}` }
    ]);

    setTitle("");
    setDescription("");
    fetchItems();
  };

  return (
    <div className="p-6 border rounded shadow">
      <h2 className="text-[#0057a8] font-bold text-xl">Lost & Found</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2"
        />
        <button className="bg-[#66b032] text-white py-2 rounded">Post Item</button>
      </form>

      {items.map((item) => (
        <div key={item.id} className="border p-3 mt-3 rounded">
          <h4>{item.title}</h4>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}