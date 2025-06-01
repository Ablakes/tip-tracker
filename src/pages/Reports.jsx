import { useState } from "react";
import Modal from "../components/Modal";
import useTips from "../hooks/useTips";

export default function Reports() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hourlyWage, setHourlyWage] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [reportData, setReportData] = useState(null);

  const { tips } = useTips(); // pulls shift history from localStorage

  const handleGenerate = async (e) => {
    e.preventDefault();

    const payload = {
      shifts: tips,
      startDate,
      endDate,
      hourlyWage: parseFloat(hourlyWage),
    };

    try {
      const response = await fetch("http://localhost:4000/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      setReportData(result);

      if (result.error) {
        console.error("Microservice error:", result.error);
      } else {
        console.log("Report result:", result);
      }
    } catch (error) {
      console.error("Error generating report:", error);
    }
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

      {reportData && !reportData.error && (
        <div className="mt-6 p-4 border rounded bg-white shadow">
          <h2 className="text-xl font-bold mb-2">Report Summary</h2>
          <ul className="space-y-1 text-left">
            <li><strong>Hours worked:</strong> {reportData.total_hours_worked}</li>
            <li><strong>Cash tips:</strong> ${reportData.cash_tips}</li>
            <li><strong>Credit tips:</strong> ${reportData.credit_tips}</li>
            <li><strong>Total tips:</strong> ${reportData.total_tips}</li>
            <li><strong>Total wages:</strong> ${reportData.total_wages}</li>
            <li><strong>Gross earnings:</strong> ${reportData.gross_earnings}</li>
            <li><strong>Start date:</strong> {reportData.start_date}</li>
            <li><strong>End date:</strong> {reportData.end_date}</li>
          </ul>
        </div>
      )}

      {reportData?.error && (
        <div className="mt-6 text-red-600 font-semibold">
          ⚠️ {reportData.error}
        </div>
      )}

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
