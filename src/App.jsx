import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Feed from "./pages/Feed";
import BlogPost from "./pages/BlogPOst";
import CreateBlog from "./pages/CreateBlog";

// Layout elements
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/post/:postId" element={<BlogPost />} />
          <Route path="/create" element={<CreateBlog />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
