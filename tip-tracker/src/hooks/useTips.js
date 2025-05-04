import { useEffect, useState } from "react";

const STORAGE_KEY = "tips";

export default function useTips() {
  const [tips, setTips] = useState([]);

  // Load tips on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setTips(JSON.parse(saved));
  }, []);

  // Save to localStorage whenever tips change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tips));
  }, [tips]);

  const addTip = (tip) => setTips((prev) => [...prev, tip]);

  const removeTip = (index) => {
    setTips((prev) => prev.filter((_, i) => i !== index));
  };

  const updateTip = (index, updatedTip) => {
    setTips((prev) =>
      prev.map((tip, i) => (i === index ? updatedTip : tip))
    );
  };

  return { tips, addTip, removeTip, updateTip };
}
