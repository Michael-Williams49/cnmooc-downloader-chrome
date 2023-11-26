chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'downloadSlideshows') {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      func: async () => {
        const source = document.documentElement.outerHTML;
        const matches = source.match(/isSlideShow\("\/(.*?)\"\)/g);
        if (!matches) {
          console.error("No slideshows found on this page");
          return;
        }
        
        for (const match of matches) {
          const url = match.match(/"\/(.*?)"/)[1];
          const downloadUrl = `http://180.76.151.202/${url}`;
          console.log('Download URL:', downloadUrl);
          window.location = downloadUrl
        }
      }
    });
  }
});