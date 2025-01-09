import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Optional logo/branding above the sign-up form */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">Create Account</h1>
          <p className="text-gray-600 mt-2">Join us and get started</p>
        </div>

        {/* Clerk SignUp component with custom styling */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <SignUp 
            routing="path" 
            path="/sign-up" 
            appearance={{
              variables: {
                colorPrimary: '#4F46E5',
                colorTextSecondary: '#6B7280',
                colorBackground: '#ffffff',
                colorInputBackground: '#F3F4F6',
                colorInputText: '#1F2937',
                borderRadius: '0.5rem'
              },
              elements: {
                formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700 transition-all duration-200',
                card: 'shadow-none',
                headerTitle: 'text-2xl font-semibold text-gray-900',
                headerSubtitle: 'text-gray-600',
                socialButtonsBlockButton: 'border-2 hover:border-indigo-600 transition-all duration-200',
                formFieldInput: 'focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600',
                footer: 'hidden'
              }
            }}
          />
        </div>

        {/* Optional promotional content */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>By signing up, you agree to our Terms and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;