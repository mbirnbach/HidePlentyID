document.addEventListener('DOMContentLoaded', function() {
  const toggleCheckbox = document.getElementById('toggleHideElements');
  const applyButton = document.getElementById('applyButton');

  chrome.storage.sync.get('hideWebshopUrlEnabled', function(data) {
    toggleCheckbox.checked = data.hideWebshopUrlEnabled !== false;
  });

  toggleCheckbox.addEventListener('change', function() {
    const isEnabled = toggleCheckbox.checked;
    chrome.storage.sync.set({'hideWebshopUrlEnabled': isEnabled}, function() {
      console.log('Hide PID enabled:', isEnabled);
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "updateHideStatus", isEnabled: isEnabled});
        }
      });
    });
  });

  applyButton.addEventListener('click', function() {
    console.log("Einstellungen angewendet (Button geklickt)");
  });
});