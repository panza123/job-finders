// NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-8xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-2xl text-gray-600">Oops! Page Not Found.</p>
      <Link to="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
