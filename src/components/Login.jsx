// import { useState } from "react";
// import { supabase } from "../supabaseClient";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       setMessage(error.message);
//     } else {
//       setMessage("Login successful!");
//       navigate("/profile"); // redirect after login
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <form className="flex flex-col gap-4" onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className={`p-3 rounded-lg font-semibold text-white ${
//               loading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
//             }`}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//         {message && (
//           <p className={`mt-4 text-center ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Login;












// import { useState } from "react";
// import { supabase } from "../supabaseClient";
// import { useNavigate } from "react-router-dom";

// const ADMIN_EMAIL = "admin@example.com";

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });

//       if (error) throw error;

//       // Admin vs User redirect
//       if (email === ADMIN_EMAIL) {
//         navigate("/admin");
//       } else {
//         navigate("/dashboard");
//       }

//     } catch (err) {
//       setMessage(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <form className="flex flex-col gap-4" onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className={`p-3 rounded-lg font-semibold text-white ${
//               loading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
//             }`}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//         {message && (
//           <p className={`mt-4 text-center ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Login;












// import { useState } from "react";
// import { supabase } from "../supabaseClient";
// import { useNavigate } from "react-router-dom";

// const ADMIN_EMAIL = "admin@gmail.com";

// const ADMIN_PASSWORD = "admin@123";


// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });

//       if (error) throw error;

//       // Redirect based on email
//       if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD ) {
//         navigate("/dashboard");
//       } else {
//         navigate("/home");
//       }

//     } catch (err) {
//       setMessage(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <form className="flex flex-col gap-4" onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className={`p-3 rounded-lg font-semibold text-white ${
//               loading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
//             }`}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//         {message && (
//           <p className={`mt-4 text-center ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Login;



















// import { useState } from "react";
// import { supabase } from "../supabaseClient";
// import { useNavigate } from "react-router-dom";

// const ADMIN_EMAIL = "admin@gmail.com"; // ✅ Admin email

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       // ✅ Supabase login
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });
//       if (error) throw error;

//       const user = data.user;
//       if (!user) throw new Error("Login failed");

//       // ✅ Admin redirect based on email
//       if (user.email === ADMIN_EMAIL) {
//         navigate("/dashboard");
//       } else {
//         navigate("/home");
//       }

//     } catch (err) {
//       setMessage(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//         <form className="flex flex-col gap-4" onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className={`p-3 rounded-lg font-semibold text-white ${
//               loading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
//             }`}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         {message && (
//           <p className={`mt-4 text-center ${
//             message.toLowerCase().includes("success") ? "text-green-600" : "text-red-600"
//           }`}>
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Login;



















import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // 1️⃣ Login user
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (!data.user) throw new Error("Login failed");

      // 2️⃣ Fetch role from profiles table
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single(); // ✅ safe, single row
      if (profileError) throw profileError;

      // 3️⃣ Redirect based on role
      if (profileData.role === "admin") {
        navigate("/dashboard"); // admin dashboard
      } else {
        navigate("/home"); // normal user
      }

    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            disabled={loading}
            className={`p-3 rounded-lg font-semibold text-white ${
              loading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;