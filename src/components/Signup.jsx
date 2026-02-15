// import { useState } from "react";
// import { supabase } from "../supabaseClient";
// import { useNavigate, Link } from "react-router-dom"; // ✅ Link import

// function Signup() {
//   const [name, setName] = useState("");   
//   const [email, setEmail] = useState(""); 
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       // 1️⃣ Signup Auth user
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           data: { name }, // name user_metadata me save hoga
//         },
//       });

//       if (error) {
//         setMessage(error.message);
//       } else {
//         // 2️⃣ Insert into profiles table
//         await supabase.from("profiles").insert([
//           { id: data.user.id, name: name, email: email },
//         ]);

//         setMessage("Signup successful! Redirecting to login...");
//         setName("");
//         setEmail("");
//         setPassword("");

//         setTimeout(() => navigate("/Home"), 2000); // 2 sec baad login page
//       }
//     } catch (err) {
//       setMessage("Something went wrong. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Signup</h2>

//         <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className={`p-3 rounded-lg font-semibold text-white transition-colors ${
//               loading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
//             }`}
//           >
//             {loading ? "Signing up..." : "Sign Up"}
//           </button>
//         </form>

//         {/* ✅ Message */}
//         {message && (
//           <p
//             className={`mt-4 text-center font-medium ${
//               message.includes("successful") ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}

//         {/* ✅ Already have an account link */}
//         <p className="mt-4 text-center text-gray-600">
//           Already have an account?{" "}
//           <Link to="/login" className="text-green-500 font-semibold hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;



















// import { useState } from "react";
// import { supabase } from "../supabaseClient";
// import { useNavigate, Link } from "react-router-dom";

// function Signup() {
//   const [name, setName] = useState("");   
//   const [email, setEmail] = useState(""); 
//   const [password, setPassword] = useState("");
//   const [profileImage, setProfileImage] = useState(null); // ✅ profile image
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     if (!name || !email || !password) {
//       setMessage("Please fill all fields");
//       setLoading(false);
//       return;
//     }

//     try {
//       // 1️⃣ Signup Auth user
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           data: { name },
//         },
//       });

//       if (error) {
//         setMessage(error.message);
//         setLoading(false);
//         return;
//       }

//       let profileUrl = null;

//       // 2️⃣ Upload profile image if exists
//       if (profileImage) {
//         const fileName = `${Date.now()}-${profileImage.name}`;
//         const { error: uploadError } = await supabase.storage
//           .from("profileimg") // ✅ make sure bucket name is correct
//           .upload(fileName, profileImage);

//         if (uploadError) {
//           setMessage("Profile image upload failed");
//           console.log(uploadError);
//         } else {
//           const { data: publicData } = supabase.storage
//             .from("profileimg")
//             .getPublicUrl(fileName);

//           profileUrl = publicData.publicUrl;

//           // Update user metadata with profile image
//           await supabase.auth.updateUser({
//             data: { profile_url: profileUrl, name },
//           });
//         }
//       }

//       // 3️⃣ Insert into profiles table
//       await supabase.from("profiles").insert([
//         { id: data.user.id, name, email, profile_url: profileUrl },
//       ]);

//       setMessage("Signup successful! Redirecting to home...");
//       setName("");
//       setEmail("");
//       setPassword("");
//       setProfileImage(null);

//       setTimeout(() => navigate("/home"), 2000); 
//     } catch (err) {
//       console.log(err);
//       setMessage("Something went wrong. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Signup</h2>

//         <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />

//           {/* Profile Image Upload */}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setProfileImage(e.target.files[0])}
//             className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className={`p-3 rounded-lg font-semibold text-white transition-colors ${
//               loading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
//             }`}
//           >
//             {loading ? "Signing up..." : "Sign Up"}
//           </button>
//         </form>

//         {/* Message */}
//         {message && (
//           <p
//             className={`mt-4 text-center font-medium ${
//               message.includes("successful") ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}

//         {/* Already have an account */}
//         <p className="mt-4 text-center text-gray-600">
//           Already have an account?{" "}
//           <Link to="/login" className="text-green-500 font-semibold hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;
















// import { useState } from "react";
// import { supabase } from "../supabaseClient";
// import { useNavigate, Link } from "react-router-dom";

// function Signup() {
//   const [name, setName] = useState("");   
//   const [email, setEmail] = useState(""); 
//   const [password, setPassword] = useState("");
//   const [profileImage, setProfileImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     if (!name || !email || !password) {
//       setMessage("Please fill all fields");
//       setLoading(false);
//       return;
//     }

//     try {
//       // Signup
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: { data: { name } },
//       });

//       if (error) {
//         setMessage(error.message);
//         setLoading(false);
//         return;
//       }

//       let profileUrl = null;

//       // Profile image upload
//       if (profileImage) {
//         const fileName = `${Date.now()}-${profileImage.name}`;
//         const { error: uploadError } = await supabase.storage
//           .from("profileimg")
//           .upload(fileName, profileImage);

//         if (!uploadError) {
//           const { data: publicData } = supabase.storage
//             .from("profileimg")
//             .getPublicUrl(fileName);

//           profileUrl = publicData.publicUrl;

//           await supabase.auth.updateUser({
//             data: { profile_url: profileUrl, name },
//           });
//         }
//       }

//       // Insert into profiles table
//       await supabase.from("profiles").insert([
//         { id: data.user.id, name, email, profile_url: profileUrl },
//       ]);

//       setMessage("Signup successful! Redirecting to login...");
//       setName("");
//       setEmail("");
//       setPassword("");
//       setProfileImage(null);

//       setTimeout(() => navigate("/login"), 2000); // redirect to login
//     } catch (err) {
//       console.log(err);
//       setMessage("Something went wrong. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Signup</h2>

//         <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setProfileImage(e.target.files[0])}
//             className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className={`p-3 rounded-lg font-semibold text-white transition-colors ${
//               loading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
//             }`}
//           >
//             {loading ? "Signing up..." : "Sign Up"}
//           </button>
//         </form>

//         {/* Message */}
//         {message && (
//           <p
//             className={`mt-4 text-center font-medium ${
//               message.includes("successful") ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}

//         {/* Already have an account */}
//         <p className="mt-4 text-center text-gray-600">
//           Already have an account?{" "}
//           <Link to="/login" className="text-green-500 font-semibold hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;

























// import { useState } from "react";
// import { supabase } from "../supabaseClient";
// import { useNavigate, Link } from "react-router-dom";

// function Signup() {
//   const [name, setName] = useState("");   
//   const [email, setEmail] = useState(""); 
//   const [password, setPassword] = useState("");
//   const [profileImage, setProfileImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     if (!name || !email || !password) {
//       setMessage("Please fill all fields");
//       setLoading(false);
//       return;
//     }

//     try {
//       // 1️⃣ Sign up user
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: { data: { name } },
//       });
//       if (error) throw error;

//       const userId = data.user.id;

//       // 2️⃣ Upload profile image if exists
//       let profileUrl = null;
//       if (profileImage) {
//         const fileName = `${Date.now()}-${profileImage.name}`;
//         const { error: uploadError } = await supabase.storage
//           .from("profileimg")
//           .upload(fileName, profileImage);

//         if (!uploadError) {
//           const { data: publicData } = supabase.storage
//             .from("profileimg")
//             .getPublicUrl(fileName);
//           profileUrl = publicData.publicUrl;

//           await supabase.auth.updateUser({
//             data: { profile_url: profileUrl, name },
//           });
//         }
//       }

//       // 3️⃣ Insert into profiles table
//       const { error: profileError } = await supabase.from("profiles").insert([
//         { id: userId, name, email, profile_url: profileUrl },
//       ]);
//       if (profileError) throw profileError;

//       setMessage("Signup successful! Redirecting to login...");
//       setName(""); setEmail(""); setPassword(""); setProfileImage(null);

//       setTimeout(() => navigate("/login"), 2000);

//     } catch (err) {
//       console.log(err);
//       setMessage("Error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Signup</h2>

//         <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setProfileImage(e.target.files[0])}
//             className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className={`p-3 rounded-lg font-semibold text-white transition-colors ${
//               loading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
//             }`}
//           >
//             {loading ? "Signing up..." : "Sign Up"}
//           </button>
//         </form>

//         {message && (
//           <p className={`mt-4 text-center font-medium ${
//             message.includes("successful") ? "text-green-600" : "text-red-600"
//           }`}>
//             {message}
//           </p>
//         )}

//         <p className="mt-4 text-center text-gray-600">
//           Already have an account?{" "}
//           <Link to="/login" className="text-green-500 font-semibold hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;






















// import { useState } from "react";
// import { supabase } from "../supabaseClient";
// import { useNavigate, Link } from "react-router-dom";

// function Signup() {
//   const [name, setName] = useState("");   
//   const [email, setEmail] = useState(""); 
//   const [password, setPassword] = useState("");
//   const [profileImage, setProfileImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     if (!name || !email || !password) {
//       setMessage("Please fill all fields");
//       setLoading(false);
//       return;
//     }

//     try {
//       // 1️⃣ Signup user
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: { data: { full_name: name } }, // supabase auth metadata
//       });
//       if (error) throw error;

//       const userId = data.user.id;

//       // 2️⃣ Upload profile image (optional)
//       let profileUrl = null;
//       if (profileImage) {
//         const fileName = `${userId}-${Date.now()}-${profileImage.name}`;
//         const { error: uploadError } = await supabase.storage
//           .from("profileimg")
//           .upload(fileName, profileImage);
//         if (!uploadError) {
//           const { data: publicData } = supabase.storage
//             .from("profileimg")
//             .getPublicUrl(fileName);
//           profileUrl = publicData.publicUrl;
//         }
//       }

//       // 3️⃣ Insert into profiles table
//       const { error: profileError } = await supabase.from("profiles").insert([
//   { id: userId, full_name: name, avatar_url: profileUrl }, // full_name & avatar_url
// ]);
//       if (profileError) throw profileError;

//       setMessage("Signup successful! Redirecting to login...");
//       setName(""); setEmail(""); setPassword(""); setProfileImage(null);
//       setTimeout(() => navigate("/login"), 2000);

//     } catch (err) {
//       console.log(err);
//       setMessage("Error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Signup</h2>

//         <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setProfileImage(e.target.files[0])}
//             className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className={`p-3 rounded-lg font-semibold text-white transition-colors ${
//               loading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
//             }`}
//           >
//             {loading ? "Signing up..." : "Sign Up"}
//           </button>
//         </form>

//         {message && (
//           <p className={`mt-4 text-center font-medium ${
//             message.includes("successful") ? "text-green-600" : "text-red-600"
//           }`}>
//             {message}
//           </p>
//         )}

//         <p className="mt-4 text-center text-gray-600">
//           Already have an account?{" "}
//           <Link to="/login" className="text-green-500 font-semibold hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;




















import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, Link } from "react-router-dom";

// ✅ Admin email aur password define karo
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin@123";

function Signup() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!email || !password) {
      setMessage("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Signup user
const { data, error } = await supabase.auth.signUp({ email, password });
if (error) throw error;

const userId = data.user.id;
const role = email === "admin@gmail.com"  &&  password === "admin@123" ? "admin" : "user";

const { error: profileError } = await supabase
  .from("profiles")
  .insert([{ id: userId, email: email, role: role }]);
if (profileError) throw profileError;

      setMessage("Signup successful! Redirecting to login...");
      setEmail(""); 
      setPassword("");

      setTimeout(() => navigate("/login"), 2000);

    } catch (err) {
      console.log(err);
      setMessage("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Signup</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            disabled={loading}
            className={`p-3 rounded-lg font-semibold text-white transition-colors ${
              loading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-center font-medium ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;