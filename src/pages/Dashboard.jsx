import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, PencilIcon, Plus, TrashIcon } from "lucide-react";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!userId) return;
      const { data, error } = await supabase
        .from("posts")
        .select()
        .eq("author", userId);

      if (error) {
        console.log("An error occurred while fetching blogs!");
        return;
      }

      console.log(data);
      setBlogs(data);
    };
    fetchBlogs();
  }, [userId]);

  useEffect(() => {
    async function checkAuth() {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) return navigate("/auth");

      setUserId(data?.session.user.id);
    }
    checkAuth();
  }, [navigate]);

  const signOUt = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("An error occurred while signing out!");
      return;
    }

    navigate("/");
  };

  const deletePost = async (postId) => {
    if (!postId) return;

    const res = await supabase.from("posts").delete().eq("id", postId);
    setBlogs(data => data.filter(item => item.id != postId));

    console.log(res);
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 flex justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary-content">
              Dashboard
            </h1>
            <p className="text-primary-content">Manage your blogs</p>
          </div>
          <button className="btn btn-secondary" onClick={signOUt}>
            Sign out
          </button>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-4">
          <Link
            to="/create"
            className="w-full h-full border-dashed border-4 border-primary/20 rounded-2xl flex justify-center items-center flex-col cursor-pointer hover:bg-primary/10 transition-colors duration-300 text-primary-content"
          >
            <Plus className="h-12 w-12 text-primary-content" />
            <p>Create New Blog</p>
          </Link>
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="card card-compact bg-base-100 shadow-xl"
            >
              <figure>
                <img
                  src={blog.image}
                  alt="Shoes"
                  className="object-cover w-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{blog.title}</h2>
                <p>{blog.body.substring(0, 150)}</p>
                <div className="card-actions justify-end flex-nowrap">
                  <button className="btn btn-sm btn-ghost">
                    <PencilIcon className="size-4" /> Edit
                  </button>
                  <Link
                    to={`/post/${blog.id}`}
                    className="btn btn-sm btn-ghost"
                  >
                    <EyeIcon className="size-4" /> View
                  </Link>
                  <button onClick={() => deletePost(blog.id)} className="btn btn-sm btn-ghost">
                    <TrashIcon className="size-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
