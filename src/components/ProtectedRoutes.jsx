// import { Navigate } from "react-router-dom";
// import { supabase } from "../supabaseClient";
// import { useEffect, useState } from "react";

// export default function ProtectedRoute({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     supabase.auth.getUser().then(({ data }) => {
//       setUser(data.user);
//       setLoading(false);
//     });
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (!user) return <Navigate to="/login" />;

//   return children;
// }















import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user || null);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;

  // Admin only route
  if (adminOnly && user.email !== "admin@example.com") {
    return <Navigate to="/dashboard" />;
  }

  return children;
}