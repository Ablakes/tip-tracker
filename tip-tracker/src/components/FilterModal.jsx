import { useState } from "react";

export default function FilterModal({ currentOrder, currentStart, currentEnd, onApply }) {
  const [sortOrder, setSortOrder] = useState(currentOrder);
  const [startDate, setStartDate] = useState(currentStart);
  const [endDate, setEndDate] = useState(currentEnd);

  const handleApply = () => {
    onApply(sortOrder, startDate, endDate);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Filter Tip History</h2>

      <div>
        <label className="block font-medium">Sort Order</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="newest">Newest to Oldest</option>
          <option value="oldest">Oldest to Newest</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Start Date (optional)</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">End Date (optional)</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={handleApply}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
}
