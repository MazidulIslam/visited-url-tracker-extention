// Initialize an empty list of visited URLs in storage
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ visitedURLs: [] });
});
