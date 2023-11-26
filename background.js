chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'downloadSlideshows') {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      func: async () => {
        const source = document.documentElement.outerHTML;
        const matches = source.match(/isSlideShow\("\/(.*?)\"\)/gi);
        if (!matches) {
          console.error("No slideshows found on this page");
          return;
        }
        
        for (const match of matches) {
          const url = match.match(/"\/(.*?)"/)[1];
          const downloadUrl = `http://180.76.151.202/${url}`;
          console.log('Download URL:', downloadUrl);
          window.open(downloadUrl, '_blank');
        }
      }
    });
  }
  if (message.action === 'downloadVideos') {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      func: async () => {
        const source = document.documentElement.outerHTML;
        const matches = source.match(/<video[^>]*src="(.*?)"[^>]*>/gi);
        if (!matches) {
          console.error("No videos found on this page");
          return;
        }
        
        for (const match of matches) {
          const url = match.match(/(?<=")[^"]*(?=")/g)[2];
          const downloadUrl = url;
          console.log('Download URL:', downloadUrl);
          window.open(downloadUrl, '_blank');
        }
      }
    });
  }
});
