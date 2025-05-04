import { useState } from "react";

export default function NewTipForm({ onSave }) {
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [cash, setCash] = useState("");
  const [credit, setCredit] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTip = {
      date,
      hours: parseFloat(hours),
      cash: parseFloat(cash),
      credit: parseFloat(credit),
    };
    onSave(newTip);

    // Reset form
    setDate("");
    setHours("");
    setCash("");
    setCredit("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-xl space-y-4">
      <h2 className="text-xl font-semibold">Enter New Tip</h2>
      <div>
        <label className="block text-sm font-medium">Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border rounded" required />
      </div>
      <div>
        <label className="block text-sm font-medium">Hours Worked</label>
        <input type="number" step="0.1" value={hours} onChange={(e) => setHours(e.target.value)} className="w-full p-2 border rounded" required />
      </div>
      <div>
        <label className="block text-sm font-medium">Cash Tips</label>
        <input type="number" step="0.01" value={cash} onChange={(e) => setCash(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium">Credit Tips</label>
        <input type="number" step="0.01" value={credit} onChange={(e) => setCredit(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Save Tip
      </button>
    </form>
  );
}
