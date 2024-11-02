import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [originalColor, setOriginalColor] = useState<string | null>(null);
  const [newColor, setNewColor] = useState<string | null>(null);

  useEffect(() => {
    chrome.storage.local.get(['originalColor'], (result) => {
      setOriginalColor(result.originalColor || null);
    });
  }, []);

  const onClick = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: (newColor) => {
        const currentColor = document.body.style.backgroundColor;
        chrome.storage.local.set({ originalColor: currentColor || 'white' });
        document.body.style.backgroundColor = newColor || "white";
      },
      args: [newColor]
    });
  };

  const onReset = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: (originalColor) => {
        document.body.style.backgroundColor = originalColor || 'white';
      },
      args: [originalColor]
    });
  };

  return (
    <>
      <h2>Background Changer</h2>
      <div className="card">
        <input type="color" onChange={(e) => setNewColor(e.target.value)} />
        <button onClick={onClick}>Set Color</button>
        <button onClick={onReset}>Reset</button>
      </div>
    </>
  );
}

export default App;
