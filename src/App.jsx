// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import Home from "./pages/Home";
// import Navbar from "./components/Navbar";
// // import Profile from "./components/Profile";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Navigate to="/Signup" />} />
//         <Route path="/Signup" element={<Signup />} />
//         <Route path="/Login" element={<Login />} />
//          <Route  path="/home" element={
//             <>
//               <Navbar/>
//               <Home/>
//             </>
//           }/>
//         {/* <Route path="/profile" element={<Profile />} /> */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;












// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { supabase } from "./supabaseClient";

// // Pages
// import Dashboard from "./pages/Dashboard";
// import Complaints from "./pages/Complaints";
// import LostFound from "./pages/LostFound";
// import Volunteer from "./pages/Volunteer";
// import Notifications from "./pages/Notification";
// import AdminPanel from "./pages/AdminPanel";

// // Components
// import Navbar from "./components/Navbar";

// export default function App() {

//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     // Get current session
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//       setLoading(false);
//     });

//     // Listen for auth changes
//     const { data: listener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         setSession(session);
//       }
//     );

//     return () => {
//       listener.subscription.unsubscribe();
//     };

//   }, []);

//   if (loading) return <div className="p-6">Loading...</div>;

//   return (
//     <Router>

//       {session && <Navbar />}

//       <Routes>

//         {/* Redirect root */}
//         <Route
//           path="/"
//           element={
//             session ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
//           }
//         />

//         {/* Protected Routes */}
//         {session && (
//           <>
//             <Route path="/Dashboard" element={<Dashboard />} />
//             <Route path="/Complaints" element={<Complaints />} />
//             <Route path="/Lostfound" element={<LostFound />} />
//             <Route path="/Volunteer" element={<Volunteer />} />
//             <Route path="/Notification" element={<Notifications />} />
//             <Route path="/AdminPanel" element={<AdminPanel />} />
//           </>
//         )}

//         {/* Simple Login Placeholder */}
//         {!session && (
//           <Route
//             path="/login"
//             element={
//               <div className="h-screen flex justify-center items-center">
//                 <button
//                   onClick={async () => {
//                     await supabase.auth.signInWithOAuth({
//                       provider: "google",
//                     });
//                   }}
//                   className="bg-[#0057a8] text-white px-6 py-3 rounded"
//                 >
//                   Login with Google
//                 </button>
//               </div>
//             }
//           />
//         )}

//         {/* Catch All */}
//         <Route
//           path="*"
//           element={<Navigate to="/" />}
//         />

//       </Routes>
//     </Router>
//   );
// }






// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { supabase } from "./supabaseClient";

// // Pages
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import Dashboard from "./pages/Dashboard";
// import AdminPanel from "./pages/AdminPanel";
// import LostFound from "./pages/LostFound";
// import Volunteer from "./pages/Volunteer";
// import Notifications from "./pages/Notifications";

// // Components
// import Navbar from "./components/Navbar";

// export default function App() {
//   const [session, setSession] = useState(null);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // Loading state

//   useEffect(() => {
//     // Get current session
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//       setUser(session?.user);
//       setLoading(false); // session loaded
//     });

//     // Listen for auth changes
//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//       setUser(session?.user);
//     });

//     return () => listener.subscription.unsubscribe();
//   }, []);

//   if (loading) return <div className="p-6 text-center">Loading...</div>;

//   return (
//     <Router>
//       {session && <Navbar />}
//       <Routes>

//         {/* Default route → Signup */}
//         <Route path="/" element={!session ? <Signup /> : user?.email === "admin@example.com" ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />} />

//         {/* Auth pages */}
//         <Route path="/signup" element={!session ? <Signup /> : <Navigate to="/" />} />
//         <Route path="/login" element={!session ? <Login /> : <Navigate to="/" />} />

//         {/* Admin route */}
//         {session && user?.email === "admin@example.com" && (
//           <Route path="/admin" element={<AdminPanel />} />
//         )}

//         {/* Normal user routes */}
//         {session && user?.email !== "admin@example.com" && (
//           <>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/lostfound" element={<LostFound />} />
//             <Route path="/volunteer" element={<Volunteer />} />
//             <Route path="/notifications" element={<Notifications />} />
//           </>
//         )}

//         {/* Catch all */}
//         <Route path="*" element={<Navigate to="/" />} />

//       </Routes>
//     </Router>
//   );
// }
















// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { supabase } from "./supabaseClient";

// // Pages
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import Dashboard from "./pages/Dashboard";
// import AdminPanel from "./pages/AdminPanel";
// import LostFound from "./pages/LostFound";
// import Volunteer from "./pages/Volunteer";
// import Notifications from "./pages/Notifications";

// // Components
// import Navbar from "./components/Navbar";

// const ADMIN_EMAIL = "admin@example.com";

// export default function App() {
//   const [session, setSession] = useState(null);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Get current session
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//       setUser(session?.user);
//       setLoading(false);
//     });

//     // Listen for auth changes
//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//       setUser(session?.user);
//     });

//     return () => listener.subscription.unsubscribe();
//   }, []);

//   if (loading) return <div className="p-6 text-center">Loading...</div>;

//   const defaultRoute = () => {
//     if (!session) return "/signup";
//     if (user?.email === ADMIN_EMAIL && user?.password === ADMIN_PASSWORD) return "/dashboard";
//     return "/home";
//   };

//   return (
//     <Router>
//       {session && <Navbar />}
//       <Routes>

//         {/* Default route */}
//         <Route path="/" element={<Navigate to={defaultRoute()} />} />

//         {/* Auth pages */}
//         <Route path="/signup" element={!session ? <Signup /> : <Navigate to={defaultRoute()} />} />
//         <Route path="/login" element={!session ? <Login /> : <Navigate to={defaultRoute()} />} />

//         {/* Admin route */}
//         {session && user?.email === ADMIN_EMAIL && (
//           <Route path="/admin" element={<AdminPanel />} />
//         )}

//         {/* Normal user routes */}
//         {session && user?.email !== ADMIN_EMAIL && (
//           <>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/lostfound" element={<LostFound />} />
//             <Route path="/volunteer" element={<Volunteer />} />
//             <Route path="/notifications" element={<Notifications />} />
//           </>
//         )}

//         {/* Catch all */}
//         <Route path="*" element={<Navigate to="/" />} />

//       </Routes>
//     </Router>
//   );
// }
























import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

// Pages
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import Home from "./pages/Home";
import LostFound from "./pages/LostFound";
import Volunteer from "./pages/Volunteer";
import Notifications from "./pages/Notifications";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoutes";
import LostFoundForm from "./components/LostFoundForm";
import VolunteersForm from "./components/VolunteersForm";
import ComplaintsForm from "./components/ComplaintsForm";

const ADMIN_EMAIL = "admin@example.com";

export default function App() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <Router>
      {session && <Navbar />}
      <Routes>

        {/* Default route */}
        <Route path="/" element={<Navigate to={session ? "/home" : "/signup"} />} />

        {/* Auth routes */}
        <Route path="/signup" element={!session ? <Signup /> : <Navigate to="/home" />} />
        <Route path="/login" element={!session ? <Login /> : <Navigate to="/home" />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* Normal user routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/LostFoundForm"
          element={
            <ProtectedRoute>
              <LostFoundForm/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ComplaintsForm"
          element={
            <ProtectedRoute>
              <ComplaintsForm/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/VolunteersForm"
          element={
            <ProtectedRoute>
              <VolunteersForm/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}