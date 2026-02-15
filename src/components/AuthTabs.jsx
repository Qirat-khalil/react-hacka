// import { useState } from "react";
// import { supabase } from "../supabaseClient";

// export default function AuthTabs() {
//   const [activeTab, setActiveTab] = useState("login");

//   // Signup state
//   const [signName, setSignName] = useState("");
//   const [signEmail, setSignEmail] = useState("");
//   const [signPass, setSignPass] = useState("");
//   const [signFile, setSignFile] = useState(null);

//   // Login state
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPass, setLoginPass] = useState("");

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     if (!signName || !signEmail || !signPass) return alert("Fill all fields");

//     const { data: signData, error: signError } = await supabase.auth.signUp({
//       email: signEmail,
//       password: signPass,
//       options: { data: { name: signName } },
//     });

//     if (signError) return alert(signError.message);

//     let profileUrl = null;
//     if (signFile) {
//       const fileName = `${Date.now()}-${signFile.name}`;
//       const { error: uploadError } = await supabase.storage
//         .from("profileimg")
//         .upload(fileName, signFile);

//       if (uploadError) return alert("Image upload failed");

//       const { data: publicData } = supabase.storage
//         .from("profileimg")
//         .getPublicUrl(fileName);

//       profileUrl = publicData.publicUrl;

//       await supabase.auth.updateUser({
//         data: { name: signName, profile_url: profileUrl },
//       });
//     }

//     alert("Signup successful!");
//     setActiveTab("login");
//     setSignName(""); setSignEmail(""); setSignPass(""); setSignFile(null);
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!loginEmail || !loginPass) return alert("Enter email and password");

//     const { data, error } = await supabase.auth.signInWithPassword({
//       email: loginEmail,
//       password: loginPass,
//     });

//     if (error) return alert(error.message);

//     alert("Login successful!");
//     window.location.href = "/navbar"; // Example redirect
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//       {/* Tabs */}
//       <div className="flex mb-6">
//         <button
//           className={`w-1/2 py-2 font-bold border-b-2 ${
//             activeTab === "login" ? "border-blue-600 text-black" : "border-transparent text-gray-500"
//           }`}
//           onClick={() => setActiveTab("login")}
//         >
//           Login
//         </button>
//         <button
//           className={`w-1/2 py-2 font-bold border-b-2 ${
//             activeTab === "signup" ? "border-green-600 text-black" : "border-transparent text-gray-500"
//           }`}
//           onClick={() => setActiveTab("signup")}
//         >
//           Signup
//         </button>
//       </div>

//       {/* Login Form */}
//       {activeTab === "login" && (
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label>Email</label>
//             <input
//               type="email"
//               value={loginEmail}
//               onChange={(e) => setLoginEmail(e.target.value)}
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label>Password</label>
//             <input
//               type="password"
//               value={loginPass}
//               onChange={(e) => setLoginPass(e.target.value)}
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
//             Login
//           </button>
//         </form>
//       )}

//       {/* Signup Form */}
//       {activeTab === "signup" && (
//         <form onSubmit={handleSignup}>
//           <div className="mb-4">
//             <label>Full Name</label>
//             <input
//               type="text"
//               value={signName}
//               onChange={(e) => setSignName(e.target.value)}
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label>Email</label>
//             <input
//               type="email"
//               value={signEmail}
//               onChange={(e) => setSignEmail(e.target.value)}
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label>Password</label>
//             <input
//               type="password"
//               value={signPass}
//               onChange={(e) => setSignPass(e.target.value)}
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label>Profile Image</label>
//             <input
//               type="file"
//               onChange={(e) => setSignFile(e.target.files[0])}
//               accept="image/*"
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>
//           <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
//             Create Account
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }