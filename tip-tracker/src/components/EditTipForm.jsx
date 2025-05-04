import { useState } from "react";

export default function EditTipForm({ tip, onSave }) {
  const [date, setDate] = useState(tip.date);
  const [hours, setHours] = useState(tip.hours);
  const [cash, setCash] = useState(tip.cash);
  const [credit, setCredit] = useState(tip.credit);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      date,
      hours: parseFloat(hours),
      cash: parseFloat(cash),
      credit: parseFloat(credit),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Edit Tip</h2>
      <div>
        <label className="block text-sm font-medium">Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border rounded" required />
      </div>
      <div>
        <label className="block text-sm font-medium">Hours</label>
        <input type="number" value={hours} step="0.1" onChange={(e) => setHours(e.target.value)} className="w-full p-2 border rounded" required />
      </div>
      <div>
        <label className="block text-sm font-medium">Cash</label>
        <input type="number" value={cash} step="0.01" onChange={(e) => setCash(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium">Credit</label>
        <input type="number" value={credit} step="0.01" onChange={(e) => setCredit(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Changes</button>
    </form>
  );
}
