import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

const Feed = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      const { data, error } = await supabase.from("posts").select("*");

      if (error) {
        console.error("An error occurred while fetching blogs!");
        return;
      }

      setBlogs(data);
      console.log(data);
    }

    fetchBlogs();
  }, []);

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-primary">Blog Feed</h1>
          <p className="text-secondary">
            Discover recent posts from other users
          </p>
        </header>

        <div className="space-y-6">

          {blogs.map((blog) => (
            <div key={blog.id} className="card card-side bg-base-100 shadow-xl">
              <figure>
                <img
                  src={blog.image}
                  alt="Blog Image"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{blog.title}</h2>
                <p>{blog.body.substring(0, 150)}</p>
                <div className="card-actions justify-end">
                  <Link to={`/post/${blog.id}`} className="btn btn-primary">Read More</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
