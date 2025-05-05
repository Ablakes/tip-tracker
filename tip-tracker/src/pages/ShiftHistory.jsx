import { useState } from "react";
import useTips from "../hooks/useTips";
import Modal from "../components/Modal";
import EditTipForm from "../components/EditTipForm";
import NewTipForm from "../components/NewTipForm";

export default function ShiftHistory() {
  const { tips, addTip, updateTip, removeTip } = useTips();

  const [editIndex, setEditIndex] = useState(null);
  const [showNewTip, setShowNewTip] = useState(false);
  const [success, setSuccess] = useState("");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Shift History</h1>

      {success && <div className="mb-4 text-green-600 font-semibold">{success}</div>}

      <button
        onClick={() => setShowNewTip(true)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Enter New Shift
      </button>

      {tips.length === 0 ? (
        <p>No shifts yet.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Date</th>
              <th className="border p-2">Hours</th>
              <th className="border p-2">Cash</th>
              <th className="border p-2">Credit</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tips.map((tip, i) => (
              <tr key={i} className="text-center bg-white border-t">
                <td className="border p-2">{tip.date}</td>
                <td className="border p-2">{tip.hours}</td>
                <td className="border p-2">${tip.cash.toFixed(2)}</td>
                <td className="border p-2">${tip.credit.toFixed(2)}</td>
                <td className="border p-2">
                  ${(tip.cash + tip.credit).toFixed(2)}
                </td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => setEditIndex(i)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      removeTip(i);
                      setSuccess("Shift deleted successfully!");
                      setTimeout(() => setSuccess(""), 3000);
                    }}
                    className="text-red-600 hover:underline"
                  >
                    Delete
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
    </div>
  );
}
