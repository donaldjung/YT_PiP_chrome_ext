// content.js
// Add message listener at the top of the file
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "togglePiP") {
    const videos = document.getElementsByTagName('video');
    if (videos.length > 0) {
      togglePiP(videos[0]);
    }
  }
});

function createButton(isYouTube) {
  const pipButton = document.createElement('button');
  
  if (isYouTube) {
    pipButton.innerHTML = `
      <svg height="100%" viewBox="0 0 36 36" width="100%">
        <path d="M25,17 L17,17 L17,23 L25,23 L25,17 L25,17 Z M29,25 L29,17 L27,17 L27,25 L19,25 L19,27 L27,27 L27,35 L29,35 L29,27 L37,27 L37,25 L29,25 L29,25 Z" fill="white"></path>
      </svg>
    `;
    pipButton.className = 'ytp-button pip-button';
    pipButton.style.cssText = `
      border: none;
      background: none;
      padding: 0;
      width: 48px;
      height: 48px;
      cursor: pointer;
      opacity: 0.9;
      transition: opacity 0.1s;
    `;
  } else {
    pipButton.textContent = 'PiP';
    pipButton.style.cssText = `
      position: absolute;
      z-index: 9999999;
      bottom: 70px;
      right: 20px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      border: none;
      border-radius: 4px;
      padding: 8px 12px;
      cursor: pointer;
      font-size: 14px;
      font-family: Roboto, Arial, sans-serif;
      transition: opacity 0.1s;
    `;
  }

  pipButton.title = 'Picture in Picture';
  pipButton.onmouseover = () => pipButton.style.opacity = '1';
  pipButton.onmouseout = () => pipButton.style.opacity = '0.9';
  
  return pipButton;
}

function addPiPButton() {
  const videos = document.getElementsByTagName('video');
  
  Array.from(videos).forEach(video => {
    if (!video.hasAttribute('data-pip-button-added')) {
      const isYouTube = window.location.hostname.includes('youtube.com');
      const pipButton = createButton(isYouTube);

      // Add click handler
      pipButton.onclick = (e) => {
        e.stopPropagation();
        togglePiP(video);
      };

      if (isYouTube) {
        // Insert into YouTube's control bar
        const rightControls = document.querySelector('.ytp-right-controls');
        if (rightControls) {
          // Insert before the theater mode button
          const theaterButton = rightControls.querySelector('.ytp-size-button');
          if (theaterButton) {
            rightControls.insertBefore(pipButton, theaterButton);
          } else {
            rightControls.appendChild(pipButton);
          }
        }
      } else {
        // Regular websites
        const wrapper = video.parentElement;
        if (wrapper) {
          wrapper.style.position = 'relative';
          wrapper.appendChild(pipButton);
        }
      }

      // Mark video as processed
      video.setAttribute('data-pip-button-added', 'true');
    }
  });
}

async function togglePiP(video) {
  try {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled) {
      await video.requestPictureInPicture();
    }
  } catch (error) {
    console.error('PiP failed:', error);
  }
}

// Initial run
addPiPButton();

// Handle YouTube's dynamic page changes
if (window.location.hostname.includes('youtube.com')) {
  // Watch for player initialization
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.target.classList?.contains('ytp-right-controls') || 
          mutation.target.classList?.contains('html5-video-player')) {
        addPiPButton();
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Handle navigation between videos
  const titleObserver = new MutationObserver(() => {
    setTimeout(addPiPButton, 500);
  });

  titleObserver.observe(document.querySelector('title'), {
    subtree: true,
    characterData: true,
    childList: true
  });
}

// Watch for new videos on other sites
const generalObserver = new MutationObserver(() => {
  if (!window.location.hostname.includes('youtube.com')) {
    addPiPButton();
  }
});

generalObserver.observe(document.body, {
  childList: true,
  subtree: true
});
