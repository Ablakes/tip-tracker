import { useState } from "react";
import EditTipForm from "../components/EditTipForm";
import Modal from "../components/Modal";
import useTips from "../hooks/useTips"; // or your custom logic

export default function TipHistory() {
  const { tips, updateTip, removeTip } = useTips();

  const [editIndex, setEditIndex] = useState(null);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Tip History</h1>
      {tips.length === 0 ? (
        <p>No tips yet.</p>
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
                <td className="border p-2">${(tip.cash + tip.credit).toFixed(2)}</td>
                <td className="border p-2 space-x-2">
                  <button onClick={() => setEditIndex(i)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => removeTip(i)} className="text-red-600 hover:underline">Delete</button>
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
            }}
          />
        </Modal>
      )}
    </div>
  );
}
