const downloadSlideshowsButton = document.getElementById('downloadSlideshows');
downloadSlideshowsButton.addEventListener('click', async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tab = tabs[0];
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        chrome.runtime.sendMessage({ action: 'downloadSlideshows' });
      }
    });
  });
});
