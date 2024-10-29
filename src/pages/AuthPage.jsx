import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useSearchParams } from "react-router-dom";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    async function checkAuth() {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) return;

      if (data?.session?.access_token) navigate("/dashboard");
    }
    checkAuth();

    if (searchParams.get("signup")) {
      setIsSignUp(true);
    } else {
      setIsSignUp(false);
    }
  }, [searchParams, navigate]);

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = isSignUp
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 flex items-center justify-center text-primary-content">
      <div className="card w-full max-w-md shadow-lg p-8 bg-white rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-4">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h2>
        <p className="text-center text-primary-content mb-6">
          {isSignUp ? "Sign up to get started" : "Login to continue"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="input input-bordered w-full"
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="form-control mt-6">
            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
            >
              {loading ? "Loading..." : isSignUp ? "Sign Up" : "Log In"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={toggleAuthMode}
              className="ml-1 text-primary underline"
            >
              {isSignUp ? "Log in here" : "Sign up here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
