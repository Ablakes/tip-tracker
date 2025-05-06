import { useState } from "react";
import useTips from "../hooks/useTips";
import Modal from "../components/Modal";
import EditTipForm from "../components/EditTipForm";
import NewTipForm from "../components/NewTipForm";
import FilterModal from "../components/FilterModal";

export default function ShiftHistory() {
  const { tips, addTip, updateTip, removeTip } = useTips();

  const [editIndex, setEditIndex] = useState(null);
  const [showNewTip, setShowNewTip] = useState(false);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);
  const [success, setSuccess] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  const filteredTips = tips
    .filter((tip) => {
      if (!filterStartDate || !filterEndDate) return true;
      const date = new Date(tip.date);
      return date >= new Date(filterStartDate) && date <= new Date(filterEndDate);
    })
    .sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return sortOrder === "newest" ? bDate - aDate : aDate - bDate;
    });

  const getWeekday = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Shift History</h1>

      {success && <div className="mb-4 text-green-600 font-semibold">{success}</div>}

      <div className="flex flex-wrap gap-4 mb-4">
        <button
          onClick={() => setShowNewTip(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Enter New Shift
        </button>
        <button
          onClick={() => setShowFilter(true)}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Filter Tip History
        </button>
        {(filterStartDate || filterEndDate || sortOrder !== "newest") && (
          <button
            onClick={() => {
              setSortOrder("newest");
              setFilterStartDate("");
              setFilterEndDate("");
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Clear Filter
          </button>
        )}
      </div>

      {filteredTips.length === 0 ? (
        <p>No shifts match your filter.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Date</th>
              <th className="border p-2">Day</th>
              <th className="border p-2">Hours</th>
              <th className="border p-2">Cash</th>
              <th className="border p-2">Credit</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTips.map((tip, i) => (
              <tr key={i} className="text-center bg-white border-t">
                <td className="border p-2">{tip.date}</td>
                <td className="border p-2">{getWeekday(tip.date)}</td>
                <td className="border p-2">{tip.hours}</td>
                <td className="border p-2">${tip.cash.toFixed(2)}</td>
                <td className="border p-2">${tip.credit.toFixed(2)}</td>
                <td className="border p-2">
                  ${(tip.cash + tip.credit).toFixed(2)}
                </td>
                <td className="border p-2 flex justify-center gap-3 text-xl">
                  <button
                    onClick={() => setEditIndex(i)}
                    className="text-blue-600 hover:scale-110 transition-transform"
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => setConfirmDeleteIndex(i)}
                    className="text-red-600 hover:scale-110 transition-transform"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editIndex !== null && (
        <Modal onClose={() => setEditIndex(null)}>
          <EditTipForm
            tip={tips[editIndex]}
            onSave={(updatedTip) => {
              updateTip(editIndex, updatedTip);
              setEditIndex(null);
              setSuccess("Shift updated successfully!");
              setTimeout(() => setSuccess(""), 3000);
            }}
          />
        </Modal>
      )}

      {showNewTip && (
        <Modal onClose={() => setShowNewTip(false)}>
          <NewTipForm
            onSave={(newTip) => {
              addTip(newTip);
              setShowNewTip(false);
              setSuccess("Shift added successfully!");
              setTimeout(() => setSuccess(""), 3000);
            }}
          />
        </Modal>
      )}

      {confirmDeleteIndex !== null && (
        <Modal onClose={() => setConfirmDeleteIndex(null)}>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Confirm Delete</h2>
            <p>Are you sure you want to delete this shift?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setConfirmDeleteIndex(null)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  removeTip(confirmDeleteIndex);
                  setConfirmDeleteIndex(null);
                  setSuccess("Shift deleted successfully!");
                  setTimeout(() => setSuccess(""), 3000);
                }}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {showFilter && (
        <Modal onClose={() => setShowFilter(false)}>
          <FilterModal
            currentOrder={sortOrder}
            currentStart={filterStartDate}
            currentEnd={filterEndDate}
            onApply={(order, start, end) => {
              setSortOrder(order);
              setFilterStartDate(start);
              setFilterEndDate(end);
              setShowFilter(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
