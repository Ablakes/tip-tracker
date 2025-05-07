import NewTipForm from "../components/NewTipForm";
import useTips from "../hooks/useTips";

export default function Dashboard() {
  const { tips, addTip } = useTips();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <NewTipForm onSave={addTip} />
    </div>
  );
}
