const CLASS_TO_HIDE = '.webshop-url';
let isHidingEnabled = true;

function hideElementsWithClass() {
  const elements = document.querySelectorAll(CLASS_TO_HIDE);
  elements.forEach(element => {
    if (element) {
      if (isHidingEnabled) {
        element.style.display = 'none';
      } else {
        element.style.display = '';
      }
    }
  });
}

function loadAndApplyStatus() {
  chrome.storage.sync.get('hideWebshopUrlEnabled', function(data) {
    isHidingEnabled = data.hideWebshopUrlEnabled !== false;
    console.log("Initial load: Hide webshop URL enabled:", isHidingEnabled);
    hideElementsWithClass();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadAndApplyStatus);
} else {
  loadAndApplyStatus();
}

const observer = new MutationObserver((mutationsList, observer) => {
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
            hideElementsWithClass();
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true, characterData: true });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "updateHideStatus") {
      isHidingEnabled = request.isEnabled;
      console.log("Received updateHideStatus. New status:", isHidingEnabled);
      hideElementsWithClass();
    }
  }
);