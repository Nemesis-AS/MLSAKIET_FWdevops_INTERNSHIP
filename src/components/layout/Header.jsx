import { Link } from "react-router-dom";
import { Feather } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }
    }

    checkAuth();
  }, []);

  return (
    <header className="navbar bg-base-100">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          <Feather className="h-8 w-8 text-primary" /> Scribe
        </Link>
      </div>
      <div className="navbar-end">
        <Link to="/feed" className="btn btn-ghost">
          Browse
        </Link>
        {loggedIn ? (
          <Link to="/dashboard" className="btn btn-primary">
            Dashboard
          </Link>
        ) : (
          <>
            <Link to="/auth" className="btn btn-ghost mr-2">
              Login
            </Link>
            <Link to="/auth?signup=true" className="btn btn-primary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
