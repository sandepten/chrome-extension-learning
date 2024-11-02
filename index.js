async function sayHello() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      alert("Hello from my extension!");
    },
  });
}

document.getElementById("click").addEventListener("click", sayHello);
