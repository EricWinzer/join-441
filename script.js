import { loadData } from "./scripts/db.js";

// Entfernt: import { getAllDataRealtime } from "./scripts/login.js";

/**
 * Initializes the page.
 */
function init(version = 0) {
    switch (version) {
        case 0:
            toggleLoadingSpinner();
            loadingSpinner();
            loadData();
            setTimeout(toggleLoadingSpinner, 3000); // ✅ Korrektur: Übergabe als Callback
            break;

        default:
            loadData();
            break;
    }
}

/**
 * Toggles visibility by class `d_none`.
 */
function toggleDNone(id) {
    document.getElementById(id).classList.toggle('d_none');
}

/**
 * Prevents event bubbling.
 */
function noBubbling(event) {
    event.stopPropagation();
}

let contentRef;

/**
 * Sets the content reference and clears it.
 */
function setContentRef(elementID) {
    contentRef = document.getElementById(elementID);
    contentRef.innerHTML = '';
}

/**
 * Toggles the loading spinner container.
 */
function toggleLoadingSpinner() {
    toggleDNone('startpage-logo-container');
    setContentRef('startpage-logo-container');
}

/**
 * Inserts loading spinner template.
 */
function loadingSpinner() {
    contentRef.innerHTML += getLoadingSpinnerTemplate();
}

window.onload = () => {
    init();
};
