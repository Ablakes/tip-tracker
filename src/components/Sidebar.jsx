import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-56 h-screen bg-white border-r p-4 fixed top-0 left-0">
      <h1 className="text-2xl font-bold mb-8">Tip Tracker</h1>
      <nav className="flex flex-col gap-4">
        <Link to="/">🏠 Home</Link>
        <Link to="/history">📋 Shift History</Link>
        <Link to="/reports">📊 Reports</Link>
      </nav>
    </div>
  );
}
