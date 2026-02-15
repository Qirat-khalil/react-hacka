import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function AdminPanel(){

  const [complaints,setComplaints]=useState([]);

  useEffect(()=>{ fetchAll(); },[]);

  const fetchAll = async ()=>{
    const { data } = await supabase
      .from("complaints")
      .select("*")
      .order("created_at",{ascending:false});

    setComplaints(data);
  };

  const updateStatus = async (id,newStatus,user_id)=>{

    await supabase
      .from("complaints")
      .update({status:newStatus})
      .eq("id",id);

    await supabase.from("notifications").insert([
      {
        user_id,
        message:`Your complaint status updated to ${newStatus}`
      }
    ]);

    fetchAll();
  };

  return(
    <div className="p-6">
      <h2 className="text-xl font-bold text-red-600">
        Admin Panel
      </h2>

      {complaints.map(c=>(
        <div key={c.id} className="border p-3 mt-3">
          <h4>{c.category}</h4>
          <p>{c.description}</p>
          <p>Status: {c.status}</p>

          <button
            onClick={()=>updateStatus(c.id,"in-progress",c.user_id)}
            className="bg-blue-500 text-white px-3 py-1 mr-2"
          >
            In Progress
          </button>

          <button
            onClick={()=>updateStatus(c.id,"resolved",c.user_id)}
            className="bg-green-500 text-white px-3 py-1"
          >
            Resolve
          </button>
        </div>
      ))}
    </div>
  );
}