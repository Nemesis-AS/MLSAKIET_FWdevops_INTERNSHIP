import { Link } from "react-router-dom";

import {
  Feather,
  Zap,
  Users,
  TrendingUp,
} from "lucide-react";


const LandingPage = () => {
  const features = [
    {
      icon: <Feather className="h-6 w-6" />,
      title: "Intuitive Editor",
      description: "Write and format your posts with ease",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Optimized for speed and performance",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Built-in Community",
      description: "Engage with your readers effortlessly",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Advanced Analytics",
      description: "Gain insights into your audience",
    },
  ];

  return (
    <div className="min-h-screen text-primary-content">
      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Write, Share, Grow with Scribe
          </h1>
          <p className="text-xl mb-8 text-gray-600">
            The modern platform for bloggers and content creators
          </p>
          <Link to="auth" className="btn btn-lg btn-primary">
            Get Started for Free
          </Link>
        </section>

        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose Scribe?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="card shadow-lg p-6 bg-white rounded-lg"
                >
                  <div className="text-primary mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
