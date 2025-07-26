import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 px-4">
      <h1 className="text-7xl font-extrabold drop-shadow-md text-blue-700">
        404
      </h1>
      <p className="text-2xl md:text-3xl mt-4 font-semibold">
        Oops! Page Not Found
      </p>
      <p className="mt-2 text-center max-w-md text-lg text-gray-600">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-8 btn btn-primary transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
        aria-label="Go Home"
      >
        Go Home
      </Link>

      {/* Animated SVG */}
      <svg
        className="mt-12 w-48 h-48 opacity-40 animate-pulse"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 240 240"
        stroke="currentColor"
      >
        <circle
          cx="120"
          cy="120"
          r="100"
          strokeWidth="8"
          className="stroke-blue-300"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="12"
          d="M80 80l80 80M160 80l-80 80"
          className="stroke-blue-600"
        />
      </svg>
    </div>
  );
};

export default NotFound;
