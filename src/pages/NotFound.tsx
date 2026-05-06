import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-gray-500 mt-2">Page not found</p>

      <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
        Go back home
      </Link>
    </div>
  );
}
