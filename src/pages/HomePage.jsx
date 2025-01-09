// src/pages/HomePage.jsx
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold text-indigo-600">Your Logo</div>
          <div className="space-x-4">
            <SignedOut>
              <button
                onClick={() => navigate("/sign-in")}
                className="px-6 py-2 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/sign-up")}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
              >
                Sign Up
              </button>
            </SignedOut>
            <SignedIn>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
              >
                Go to Dashboard
              </button>
            </SignedIn>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mt-20">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Your App
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Your amazing app description goes here. Inspire your users to sign
            up or sign in.
          </p>

          <SignedOut>
            <div className="space-x-4">
              <button
                onClick={() => navigate("/sign-in")}
                className="px-8 py-3 text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-200 font-medium"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/sign-up")}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
              >
                Get Started
              </button>
            </div>
          </SignedOut>
          <SignedIn>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
            >
              Go to Dashboard
            </button>
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
