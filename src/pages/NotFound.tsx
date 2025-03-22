
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="glass-card rounded-xl max-w-md w-full p-8 text-center animate-fade-in">
        <div className="bg-primary/10 rounded-full p-3 mx-auto w-fit mb-6">
          <AlertTriangle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-medium mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Page not found
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
