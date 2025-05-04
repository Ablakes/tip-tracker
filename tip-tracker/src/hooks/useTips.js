import { useState } from "react";

const STORAGE_KEY = "tips";

export default function useTips() {
  const getTipsFromStorage = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  };

  const [tips, setTips] = useState(getTipsFromStorage);

  const addTip = (tip) => {
    const updated = [...tips, tip];
    setTips(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const removeTip = (index) => {
    const updated = tips.filter((_, i) => i !== index);
    setTips(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const updateTip = (index, updatedTip) => {
    const updated = tips.map((tip, i) => (i === index ? updatedTip : tip));
    setTips(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return { tips, addTip, removeTip, updateTip };
}
