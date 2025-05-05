import { useState } from "react";

export default function NewTipForm({ onSave }) {
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [cash, setCash] = useState("");
  const [credit, setCredit] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const today = new Date();
  const todayString = today.toLocaleDateString("en-CA");

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedDate = new Date(date);
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    // Validation
    if (!date || !hours) {
      setError("Date and hours are required.");
      return;
    }

    if (selectedDate > today) {
      setError("Date cannot be in the future.");
      return;
    }

    if (parseFloat(hours) < 0 || parseFloat(cash) < 0 || parseFloat(credit) < 0) {
      setError("Values cannot be negative.");
      return;
    }

    const newTip = {
      date,
      hours: parseFloat(hours),
      cash: parseFloat(cash) || 0,
      credit: parseFloat(credit) || 0,
    };

    onSave(newTip);

    // Reset form and show success message
    setDate("");
    setHours("");
    setCash("");
    setCredit("");
    setError("");
    setSuccess("Tip saved successfully!");

    // Clear success after 3 seconds
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-xl space-y-4">
      <h2 className="text-xl font-semibold">Enter New Tip</h2>

      {error && <div className="text-red-600 font-semibold">{error}</div>}
      {success && <div className="text-green-600 font-semibold">{success}</div>}

      <div>
        <label className="block text-sm font-medium">Date</label>
        <input
          type="date"
          value={date}
          max={todayString}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Hours Worked</label>
        <input
          type="number"
          step="0.1"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Cash Tips</label>
        <input
          type="number"
          step="0.01"
          value={cash}
          onChange={(e) => setCash(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Credit Tips</label>
        <input
          type="number"
          step="0.01"
          value={credit}
          onChange={(e) => setCredit(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Save Tip
      </button>
    </form>
  );
}
