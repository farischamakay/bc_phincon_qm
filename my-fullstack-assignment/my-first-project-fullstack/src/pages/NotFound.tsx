import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="container">
      <div className="card p-6 text-center">
        <h1 className="mb-4">404 - Page Not Found</h1>
        <p className="mb-6 text-muted">
          The page you are looking for does not exist.
        </p>
        <Link to="/" className="btn btn-primary">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
