import useTips from "../hooks/useTips";

export default function TipHistory() {
  const { tips, removeTip } = useTips();

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
                <td className="border p-2">
                  ${(tip.cash + tip.credit).toFixed(2)}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => removeTip(i)}
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
    </div>
  );
}
