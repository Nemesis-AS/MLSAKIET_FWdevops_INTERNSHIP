import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useParams } from "react-router-dom";
import Markdown from "react-markdown";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

const BlogPost = () => {
  const [blogData, setBlogData] = useState(null);
  const { postId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlog() {
      const {data, error} = await supabase.from("posts").select("*").eq("id", postId);

      if (error) {
        console.error("An error occurred while fetching blog post!");
        navigate("/feed");
        return;
      }

      setBlogData(data[0]);
    }

    fetchBlog();
  }, [navigate, postId]);

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-primary">
            {blogData?.title}
          </h1>
          {/* <p className="text-secondary mb-2">By Username on Oct 28</p> */}
          {/* <p className="text-info">Category: Lifestyle</p> */}
        </header>

        <img src={blogData?.image} className="w-full object-cover rounded-lg" alt="Blog Image" />

        <Markdown className="prose lg:prose-lg py-8">
          {blogData?.body}
        </Markdown>
      </div>
    </div>
  );
};

export default BlogPost;
