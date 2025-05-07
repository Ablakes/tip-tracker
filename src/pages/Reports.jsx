import { useState } from "react";
import Modal from "../components/Modal";

export default function Reports() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hourlyWage, setHourlyWage] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    // Report generation will go here
    console.log("Generating report:", { startDate, endDate, hourlyWage });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Reports</h1>
        <button
          onClick={() => setShowInfo(true)}
          title="What is this page?"
          className="text-blue-600 text-2xl hover:text-blue-800"
        >
          ℹ️
        </button>
      </div>

      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Hourly Wage ($)</label>
          <input
            type="number"
            step="0.01"
            value={hourlyWage}
            onChange={(e) => setHourlyWage(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate Report
        </button>
      </form>

      {showInfo && (
        <Modal onClose={() => setShowInfo(false)}>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">About Reports</h2>
            <p>
              This page allows you to generate reports based on your shift history.
              You can select a date range and enter your hourly wage to see
              earnings, tip breakdowns, and averages for that time period.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowInfo(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Got it
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
