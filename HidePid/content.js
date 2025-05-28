// Diese Datei wird automatisch geladen, wenn die Seite dem "matches" Muster in manifest.json entspricht.

const CLASS_TO_HIDE = '.webshop-url'; // Die Klasse des HTML-Elements, das ausgeblendet werden soll

function hideElementsWithClass() {
  const elements = document.querySelectorAll(CLASS_TO_HIDE);
  elements.forEach(element => {
    if (element) {
      element.style.display = 'none'; // Blendet das Element aus
      // Alternativ könntest du auch element.remove(); verwenden, um es komplett aus dem DOM zu entfernen.
    }
  });
}

// Führe die Funktion aus, sobald das DOM geladen ist
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hideElementsWithClass);
} else {
  hideElementsWithClass();
}

// Verwende einen MutationObserver, um dynamisch geladene Inhalte zu überwachen
const observer = new MutationObserver((mutationsList, observer) => {
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
            // Wenn neue Elemente hinzugefügt oder Textdaten geändert werden,
            // versuchen wir erneut, die Elemente auszublenden.
            hideElementsWithClass();
        }
    }
});

// Beobachte den gesamten Body auf Änderungen in den Kindelementen und Unterbäumen.
observer.observe(document.body, { childList: true, subtree: true, characterData: true });

// Funktion, die vom popup.js aufgerufen werden kann (falls nötig, um manuell auszulösen)
function hideWebshopUrlElements() {
  hideElementsWithClass();
}