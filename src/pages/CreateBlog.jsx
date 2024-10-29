import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { Editor } from "@monaco-editor/react";

// import { MDXEditor, headingsPlugin } from "@mdxeditor/editor";
// import "@mdxeditor/editor/style.css";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) return navigate("/auth");

      setUserId(data?.session.user.id);
    }
    checkAuth();
  }, [navigate]);

  const handleImageChange = async (e) => {
    const img = e.target.files[0];

    setUploadingImage(true);

    const { data, error } = await supabase.storage
      .from("blog_images")
      .upload(`${userId}/${Date.now()}.png`, img, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.log("An error occurrd wile uploading file!");
      setUploadingImage(false);
      return;
    }

    const { data: url } = await supabase.storage
      .from("blog_images")
      .getPublicUrl(data.path);


    setImage(url?.publicUrl);
    setUploadingImage(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("posts")
      .insert({ title, body, image, author: userId });

    if (error) {
      console.log("An error occurred while creating the post!");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">
          Create New Blog Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-primary mb-2">
              Title
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-primary mb-2">
              Body
            </label>
            <Editor
              height="300px"
              defaultLanguage="markdown"
              value={body}
              onChange={(value) => setBody(value)}
              theme="vs-dark"
              className="border border-base-300 rounded"
              options={{ minimap: { enabled: false } }}
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-primary mb-2">
              Upload Image
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={handleImageChange}
              accept="image/*"
            />

            {uploadingImage && (
              <p className="text-sm text-primary mt-2">Uploading image...</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={uploadingImage}
          >
            Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
