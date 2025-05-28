document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');
    toggleButton.addEventListener('click', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          function: hideWebshopUrlElements // Ruft die neue Funktion in content.js auf
        });
      });
    });
  });
  
  // Diese Funktion wird in den Kontext der Webseite injiziert
  // Sie ist hier nur als Platzhalter und wird durch den content.js Code aufgerufen.
  // Der eigentliche Code zum Ausblenden befindet sich in content.js.
  function hideWebshopUrlElements() {
    // Diese Funktion existiert nur, damit chrome.scripting.executeScript eine Funktion übergeben werden kann.
    // Der eigentliche Logik befindet sich in content.js und wird automatisch ausgeführt.
    console.log(" hideWebshopUrlElements Funktion aus popup.js aufgerufen.");
    // Hier wird der Code aus content.js durch den MutationObserver getriggert oder beim Laden der Seite.
  }